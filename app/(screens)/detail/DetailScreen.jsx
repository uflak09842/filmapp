import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

import langCodes from './components/langCodes';
import useGet from '../../components/hooks/normalServer/useGet';
import ErrorCard from '../../components/infoCards/ErrorCard';
import styles from './detailScreen.style';
import CompaniesCard from '../../components/cards/CompaniesCard';

const DetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [ bgLoad, setBgLoad ] = useState(true);
  const [ posterLoad, setPosterLoad ] = useState(true);

  const { loading, error, data: movie } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`, { id });

  if(loading) return <ActivityIndicator size={'large'} style={{flex: 1, alignSelf: 'center'}} />
  if(error) return <ErrorCard desc={error} />
  if(!movie) return <ErrorCard desc={'Film Bulunamadı'} />

  const language = langCodes[movie.original_language] || movie.original_language || 'Bulunamadı';
  const release = movie.release_date.substring(0,4) || 'Bulunamadı'; 
  const genres = movie.genres.filter(x => x !== null).map(x => x.name).join(', ') || 'Bulunamadı';
  const productions = movie.production_companies.filter( 
    x => x !== null && x.name !== '' && x.logo_path !== null 
  ).map(x => ({name: x.name, logo_path: x.logo_path}));
  const descStyle = movie.overview.length === 0 ? { display: 'none' } : styles.descView;
  const tagline = movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : "";

  console.log(movie);

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <View style={styles.bdView}>
        {bgLoad && ( <ActivityIndicator style={styles.loading} size="large" /> )}
        <Image 
          style={styles.backDrop} 
          src={process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + movie.backdrop_path}  
          resizeMode='contain'
          onLoadStart={() => setBgLoad(true)}
          onLoadEnd={() => setBgLoad(false)}
        />
      </View>

      <View style={styles.infoView}>
        <View style={styles.posterView}>
          { posterLoad && ( <ActivityIndicator style={styles.loading} size="large" /> ) }
          <Image 
            style={styles.poster}
            src={ process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + movie.poster_path }
            resizeMode='cover'
            onLoadStart={() => setPosterLoad(true)}
            onLoadEnd={() => setPosterLoad(false)}
          />
        </View>

        <View style={styles.etcView}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{movie.title}</Text>
          </View>

          <View style={styles.innerDescView}>
            { 
              !tagline || tagline === null ? 
              null :
              <View style={styles.taglineView}>
                <Text numberOfLines={2} style={styles.tagline}> { tagline } </Text>
              </View>
            }

            <View style={styles.lrView}>
              <Text style={styles.text}>{ language } </Text>
              <Text style={styles.text}> { release }</Text>
            </View>
            <Text style={styles.text}>{ genres }</Text>
          </View>
          
        </View>
      </View>

      {
        !movie.overview || movie.overview === null ?
        null :
        <View style={styles.descView}>
          <Text style={styles.desc}>{ movie.overview }</Text>
        </View>
      }

      {
        productions ? 
        <View>
        <FlatList 
          data={productions}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <CompaniesCard name={item.name} logo={item.logo_path}/>
            )
          }}
        />
      </View>
      :
      null
      }


    </ScrollView>
  )
}

export default DetailScreen