import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { AuthProvider } from './context/AuthContext.jsx';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false, 
                contentStyle: {
                    backgroundColor: "#F2F3F4"
                }
            }}>
                <Stack.Screen name='(screens)/(tabs)' options={{contentStyle: {backgroundColor: "#F2F3F4"}}} />
            </Stack>
        </AuthProvider>
    )
};