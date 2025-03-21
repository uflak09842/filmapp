import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../components/axiosInstance';
import styles from '../../components/homeScreen/homeScreen.styles';
import { router, Redirect } from 'expo-router';
import MoviesCard from '../../components/cards/MoviesCard/MoviesCard';

const Home = () => {
  
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axiosInstance.get( process.env.EXPO_PUBLIC_SERVER_URL + '/recommendations' );
        setMovies(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    getMovies();
  }, []);

  return (
      <View style={styles.root}>
        <MoviesCard props={movies} />
      </View>
    
  )
}

export default Home