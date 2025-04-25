import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router, useRootNavigationState, Redirect } from 'expo-router';
import { useAuth } from './context/AuthContext';
import axiosInstance from './components/axiosInstance';

export default function Index() {
    const { authState } = useAuth();
    const [ preferences, setPreferences ] = useState(null);
    const [ prefLoading, setPrefLoading ] = useState(false);

    useEffect(() => {
        const getPreferences = async () => {
            if(authState?.authenticated) {
                try {
                    setPrefLoading(true);
                    const response = await axiosInstance.get( process.env.EXPO_PUBLIC_SERVER_URL + '/preferences');
                    setPreferences(response.data);
                } catch (err) {
                    setPreferences(false);
                } finally {
                    setPrefLoading(false);
                }
            };
        }

        getPreferences();
    }, [authState?.authenticated]);

    const rootNavigationState = useRootNavigationState(); //
    if(!rootNavigationState?.key) return null; // root layout renderlenmedi diye ağlamaması için // loading değişkeni sorunu çözdü ?

    if(authState?.loading || prefLoading) {
        return <ActivityIndicator size={'large'} style={{flex: 1, alignSelf: 'center'}} />
    }

    if(authState?.authenticated) {
        if(preferences?.prefSelected) {
            return <Redirect href={'/home/'} />
        } else {
            return <Redirect href={'/preferences/PreferencesScreen'} />;
        }
    } else {
        return <Redirect href={'/auth/Login'} />
    }
};