import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#4F709C',  headerShown: false}}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name='search/SearchScreen'
        options={{
            title: 'Ara',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name='profile/ProfileScreen'
        options={{
            title: 'Profil',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
