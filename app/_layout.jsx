import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false, 
                contentStyle: {
                    backgroundColor: "#F5EFE7"
                }
            }}>
                <Stack.Screen name='(screens)/(tabs)' options={{contentStyle: {backgroundColor: "#F5EFE7"}}} />
            </Stack>
        </AuthProvider>
    )
};