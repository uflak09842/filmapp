import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, ActivityIndicator, ScrollView, RefreshControl, Button } from 'react-native'
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../components/axiosInstance';
import styles from '../../../components/profileScreen/ProfileScreen.style.js';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import HorizontalMovieCard from '../../../components/profileScreen/cards/HorizontalMovieCard';

const ProfileScreen = () => {
  const { logout } = useAuth();

  const [ user, setUser ] = useState();
  const [ backdrop, setBackdrop ] = useState();
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user`);
      const user = response.data.rest;
      setUser(user);
    } 

    getUser();
  }, [refreshing]);

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPopular`);
      setBackdrop(response.data.results[0].backdrop);
    }

    getMovie();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  if(!user || !backdrop) return <ActivityIndicator size={'large'} style={{flex: 1, alignSelf: 'center'}} />

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.backdropView}>
          <Image
            source={{uri: process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + backdrop}} 
            style={styles.backdrop}
          />
        </View>

        <Button title='Çıkış Yap' onPress={logout} />
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default ProfileScreen