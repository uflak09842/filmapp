import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import axiosInstance from "../components/axiosInstance";
import * as SecureStore from 'expo-secure-store';
import { Redirect, router } from "expo-router";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState ] = useState({
        token: null, 
        authenticated: null,
        loading: true
    });

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY);

                if(token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/isValidToken`); // backend de sadece middleware ile kontrol ediyorum endpoint olması için oluşturulmuş bir endpoint

                    //token varsa
                    setAuthState({
                        token: token,
                        authenticated: true,
                        loading: false
                    });
                } else {
                    //token yoksa
                    setAuthState({
                        token: null,
                        authenticated: false,
                        loading: false
                    });
                }
            } catch (err) {
                //middleware'dan yani endpointten hata dönmüşse (if şartı yok her halükarda zaten token sıkıntılı olduğundan auth vermicem)
                if(err.status === 404) {
                    try {
                        const refreshToken = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);

                        const response = await axios.post(`${process.env.EXPO_PUBLIC_AUTH_SERVER_URL}/token`, {refreshToken});

                        setAuthState({
                            token: response.data.accessToken,
                            authenticated: true,
                            loading: false
                        });

                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

                        await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY, response.data.accessToken);

                        return;
                    } catch (err) {
                        //token yenilenirken hata olmuşsa
                        setAuthState({
                            token: null,
                            authenticated: false,
                            loading: false
                        });
                    }
                } else {
                    setAuthState({
                        token: null,
                        authenticated: false,
                        loading: false
                    });
                }
                
            }
        }

        loadToken();
    }, [])

    const register = async ( username, email, password, country ) => {
        try {
            return await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/createUser`, { username, email, password, country })
        } catch (err) {
            console.error(err);
            return {
                error: true, 
                msg: err.response.data.msg.message || err.response.data.msg || 'Bilinmeyen Hata'
            }
        }
    };

    const login = async ( email, password ) => {
        try {
            const result = await axios.post(`${process.env.EXPO_PUBLIC_AUTH_SERVER_URL}/login`, { email, password });

            setAuthState({
                token: result.data.accessToken,
                authenticated: true,
                loading: false
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY, result.data.accessToken);
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY, result.data.refreshToken);

            return result;
        } catch (err) {
            return {
                error: true, 
                msg: err.response.data.msg
            }
        }
    };

    const logout = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);

            if(refreshToken) {
                await axios.post(`${process.env.EXPO_PUBLIC_AUTH_SERVER_URL}/logout`, { refreshToken });
            }
        } catch (err) {
            console.error(err);
        } finally {
            await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY);
            await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);

            axios.defaults.headers.common['Authorization'] = '';
            axiosInstance.defaults.headers.common['Authorization'] = '';

            setAuthState({
                token: null,
                authenticated: false,
                loading: false
            })

            router.replace('/');
        }
    }

    const value = {
        register,
        login,
        logout,
        authState
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}