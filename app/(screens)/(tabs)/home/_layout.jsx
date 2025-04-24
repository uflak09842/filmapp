import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Slot, useNavigation, DrawerToggleButton, useSegments } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';

const routeTitles = { //direkt klasör adını vermek yerine filtre
    home: 'Ana Sayfa',
    list: 'Listeler',
};

export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          header: () => <CustomHeader />,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#F5EFE7',
            width: '75%',
          },
          drawerPosition: 'right',
          drawerActiveBackgroundColor: '#4F709C',
          drawerActiveTintColor: 'white',
        }}
      >
        <Drawer.Screen name="index" options={{ 
            drawerLabel: "Ana Sayfa", 
            drawerIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        }}/>
        <Drawer.Screen name="list/index" options={{ 
            drawerLabel: "Listeler",
            drawerIcon: ({ color }) => <FontAwesome size={24} name="list-ul" color={color} />,
        }}/>
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomHeader() {
  const navigation = useNavigation();
  const segments = useSegments();

  const currentSegment = segments[segments.length - 1];
  const title = routeTitles[currentSegment] || 'Sayfa';

  return (
    <View style={{
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      backgroundColor: '#F5EFE7',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <FontAwesome name="bars" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}