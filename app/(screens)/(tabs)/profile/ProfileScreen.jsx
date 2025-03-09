import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../components/axiosInstance';
import styles from '../../../components/profileScreen/ProfileScreen.style.js';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import LikedMovies from '../../../components/profileScreen/cards/LikedMovies';

const ProfileScreen = () => {
  const { logout } = useAuth();

  const [ backdrop, setBackdrop ] = useState();
  const [likedMvData, setLikedMvData ] = useState();
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user`);
      const user = response.data.rest;
    } 

    getUser();
  }, [refreshing]);

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPopular`);
      setBackdrop(response.data[0].backdrop);
    }

    getMovie();
  }, [refreshing]);

  useEffect(() => {
    const getLiked = async () => {
      const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/userLiked`);
      setLikedMvData(response.data);
    };
  
    getLiked();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  if(!likedMvData) return <ActivityIndicator size={50} />

  const likedMovies = likedMvData.map((item) => ({
    id: item.mvId,
    poster: item.poster,
    title: item.title
  }));

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableWithoutFeedback onPress={() => router.push('/components/profileScreen/SettingsScreen')} >
        <View style={styles.settings}>
          <FontAwesome name='gear' size={30} color={'#4F709C'} />
        </View>
        </TouchableWithoutFeedback>

        <View style={styles.backdropView}>
          <Image
            src={process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + backdrop} 
            style={styles.backdrop}
          />
        </View>

        <View style={styles.likedMovies}>
          <LikedMovies likedMovies={likedMovies} />
        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default ProfileScreen