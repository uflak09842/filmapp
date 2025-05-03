import { Stack } from 'expo-router';

export default function ListLayout() {
    return (
        <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F2F3F4' },
        }}
        >
        <Stack.Screen name="index" options={{ title: 'Liste Detayı' }} />
        </Stack>
    );
};