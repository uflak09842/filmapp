import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Slot, useNavigation, DrawerToggleButton, useSegments } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';

const routeTitles = { //direkt klasör adını vermek yerine filtre
    home: 'Önerilenler',
    list: 'Listelerim',
    detail: 'Liste',
};

export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          header: () => <CustomHeader />,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#F2F3F4',
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

        <Drawer.Screen name="list" options={{ 
            drawerLabel: "Listelerim",
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

  if(currentSegment === 'DetailScreen') { //liste/film sayfasından film detaya geçerkenki bug engelliyor.
    return null;
  };

  const title = routeTitles[currentSegment] || 'Sayfa';

  if(title === 'Liste') { // liste sayfasında başlık sistemi kapatıyom
    return null;
  };

  return (
    <View style={{
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      backgroundColor: '#F2F3F4',
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