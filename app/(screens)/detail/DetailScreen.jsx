import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const DetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [ movie, setMovie ] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`, {
        params: { id }
      });

      setMovie(response.data); 
    }

    getMovie();
  }, []);

  console.log(movie)

  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  )
}

export default DetailScreen