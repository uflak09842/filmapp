import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../components/axiosInstance';
import styles from '../../../components/profileScreen/ProfileScreen.style.js';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

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
    <SafeAreaView style={styles.root}>
      <TouchableWithoutFeedback onPress={() => router.push('/components/profileScreen/SettingsScreen')} >
        <View style={styles.settings}>
          <FontAwesome name='gear' size={30} color={'#4F709C'} />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.test}>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen