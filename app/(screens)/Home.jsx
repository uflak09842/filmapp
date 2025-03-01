import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios';

const Home = () => {
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
    </View>
  )
}

export default Home