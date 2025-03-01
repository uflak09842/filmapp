import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user`);

      console.log(user);
    } 

    getUser();
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={logout} title={'Çıkış Yap'} />
    </View>
  )
}

export default Home