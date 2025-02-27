import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { AuthProvider, useAuth } from './context/AuthContext';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{headerShown: false}} />
        </AuthProvider>
    )
};