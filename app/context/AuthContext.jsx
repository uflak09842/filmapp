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
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY);

            if(token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
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
                msg: err.response.data.msg
            }
        }
    };

    const login = async ( email, password ) => {
        try {
            const result = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/auth`, { email, password })

            console.log('login: ' + result);

            setAuthState({
                token: result.data.token,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY, result.data.token);

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
            authenticated: false
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