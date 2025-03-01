import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../components/axiosInstance';

const ProfileScreen = () => {
  const { logout } = useAuth();
  
  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user`);

      const user = response.data.rest;

      console.log(response.data.rest);
    } 

    getUser();
  }, []);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen