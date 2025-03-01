import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

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

                console.log(token);

                if(token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    setAuthState({
                        token: token,
                        authenticated: true,
                        loading: false
                    });
                } else {
                    setAuthState({
                        token: null,
                        authenticated: false,
                        loading: false
                    });
                }
            } catch (err) {
                console.error('Token Yüklenirken Bir Sorun Oluştu AuthContext.jsx: ' + err);

                setAuthState({
                    token: null,
                    authenticated: false,
                    loading: false
                });
            }
        }

        loadToken();
    }, [])

    const register = async ( username, email, password, country ) => {
        try {
            return await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/createUser`, { username, email, password, country })
        } catch (err) {
            return {
                error: true, 
                msg: err.response.data.msg.message || err.response.data.msg || 'Bilinmeyen Hata'
            }
        }
    };

    const login = async ( email, password ) => {
        try {
            const result = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/login`, { email, password });

            setAuthState({
                token: result.data.accessToken,
                authenticated: true,
                loading: false
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY, result.data.accessToken);

            return result;
        } catch (err) {
            return {
                error: true, 
                msg: err.response.data.msg
            }
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
            loading: false
        })
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