import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const DetailScreen = () => {
  const mv = useLocalSearchParams();

  const [ movie, setMovie ] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const movie = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`);

      
    }
  }, []);

  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  )
}

export default DetailScreen