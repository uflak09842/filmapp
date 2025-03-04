import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

import langCodes from './components/langCodes';
import useGet from '../../components/hooks/normalServer/useGet';
import ErrorCard from '../../components/infoCards/ErrorCard';

const DetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { loading, error, data: movie } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`, { id });

  if(loading) return <ActivityIndicator size={'large'} />
  if(!error) return <ErrorCard desc={error} /> // Error Card tasarlamak için !error yaptım ! kaldır
  if(!movie) return <Text>Film Bulunamadı</Text>

  const language = langCodes[movie.original_language] || movie.original_language;
  const release = movie.release_date.substring(0,4); 

  console.log(release);

  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  )
}

export default DetailScreen