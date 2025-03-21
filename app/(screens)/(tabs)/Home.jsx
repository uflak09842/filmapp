import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../components/axiosInstance';
import styles from '../../components/homeScreen/homeScreen.styles';
import { router, Redirect } from 'expo-router';

const Home = () => {

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axiosInstance.get( process.env.EXPO_PUBLIC_SERVER_URL + '/recommendations' );
        
      } catch (err) {
        console.log(err);
      }
    }

    getMovies();
  });

  return (
    <>
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text>asd</Text>
          </View>
        </View>
      </View>
    </>
    
  )
}

export default Home