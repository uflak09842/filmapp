import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false}}>
                <Stack.Screen name='(screens)/(tabs)' />
            </Stack>
        </AuthProvider>
    )
};