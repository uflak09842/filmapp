import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router, useRootNavigationState, Redirect } from 'expo-router';
import { useAuth } from './context/AuthContext';

export default function Index() {
    const { authState } = useAuth();

    const rootNavigationState = useRootNavigationState(); //
    if(!rootNavigationState?.key) return null; // root layout renderlenmedi diye ağlamaması için

    if(authState?.authenticated) {
        return <Redirect href={'/screens/Home'} />
    } else {
        return <Redirect href={'/screens/auth/Login'} />
    }

    return(
        <ActivityIndicator size={'large'} style={{flex: 1, alignSelf: 'center'}} />
    )
};