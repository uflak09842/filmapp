import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

import langCodes from './components/langCodes';
import useGet from '../../components/hooks/normalServer/useGet';
import ErrorCard from '../../components/infoCards/ErrorCard';
import styles from './detailScreen.style';

const DetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [ bgLoad, setBgLoad ] = useState(true);

  const { loading, error, data: movie } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`, { id });

  if(loading) return <ActivityIndicator size={'large'} style={{flex: 1, alignSelf: 'center'}} />
  if(error) return <ErrorCard desc={error} />
  if(!movie) return <ErrorCard desc={'Film Bulunamadı'} />

  const language = langCodes[movie.original_language] || movie.original_language || 'Bulunamadı';
  const release = movie.release_date.substring(0,4) || 'Bulunamadı'; 
  const genres = movie.genres.filter(x => x !== null).map(x => x.name) || 'Bulunamadı';
  const productions = movie.production_companies.filter( 
    x => x !== null && x.name !== '' && x.logo_path !== null 
  ).map(x => ({name: x.name, logo_path: x.logo_path}));
  const descStyle = movie.overview.length === 0 ? { display: 'none' } : styles.descView;
  const tagline = movie.tagline ? <Text style={styles.tagline}>"{movie.tagline}"</Text> : "";

  return (
    <ScrollView style={styles.root}>
      <View style={styles.resimPanel}>
        {bgLoad && (
          <ActivityIndicator style={styles.loading} size="large" />
        )}
        <Image 
          style={styles.resim} 
          src={process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + movie.backdrop_path}  
          resizeMode='contain'
          onLoadStart={() => setBgLoad(true)}
          onLoadEnd={() => setBgLoad(false)}
        />
      </View>


    </ScrollView>
  )
}

export default DetailScreen