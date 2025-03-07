import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

import langCodes from './components/langCodes';
import useGet from '../../components/hooks/normalServer/useGet';
import ErrorCard from '../../components/infoCards/ErrorCard';
import styles from './detailScreen.style';
import CompaniesCard from '../../components/cards/CompaniesCard';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from '../../components/axiosInstance';
import RecommendationsCard from '../../components/cards/RecommendationsCard';

const DetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [ bgLoad, setBgLoad ] = useState(true);
  const [ posterLoad, setPosterLoad ] = useState(true);

  const [like, setLike ] = useState(false);
  const [watched, setWatched ] = useState(false);

  const { loading, error, data: movie } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`, { id });

  useEffect(() => {
    const getStates = async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getDetailStates`, {
        params: { id }
      });

      console.log(response.data)

      setLike(response.data.liked);
    }

    getStates();
  }, [])

  if(loading) return <ActivityIndicator size={'large'} style={{flex: 1, alignSelf: 'center'}} />
  if(error) return <ErrorCard desc={error || 'Bilinmeyen Hata'} />
  if(!movie) return <ErrorCard desc={'Film Bulunamadı'} />

  const { mvId, release, genres, productions } = movie;

  const language = langCodes[movie.language] || movie.language || 'Bulunamadı';
  const descStyle = movie.description === 0 ? { display: 'none' } : styles.descView;
  const tagline = movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : "";

  const handleLike = async () => {
    if(like) {
      setLike(false);
      try {
        const response = await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/deleteLike`, { mvId });
      } catch (err) {
        console.error(err);
      }
    } else {
      setLike(true);
      try {
        const response = await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/addLike`, { mvId })
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handleWatched = () => {
    if(watched) {
      setWatched(false);
    } else {
      setWatched(true);
    }
  }

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <View style={styles.bdView}>
        {bgLoad && ( <ActivityIndicator style={styles.loading} size="large" /> )}
        <Image 
          style={styles.backDrop} 
          src={process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + movie.backdrop}  
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
            src={ process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + movie.poster }
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

      <View style={styles.interactView}>
        <TouchableOpacity onPress={() => {handleLike()}}>
          <View style={styles.reactBox}>
            {
              like ? 
              <FontAwesome name='heart' size={50} /> : 
              <FontAwesome name='heart-o' size={50} />
            }
          </View> 
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleWatched()}}>
          <View style={styles.reactBox}>
            {
              watched ? <FontAwesome name='eye' size={50} /> :
              <FontAwesome name='eye-slash' size={50} />
            }
          </View>
        </TouchableOpacity>

        
        
      </View>

      {
        !movie.description || movie.description === null ?
        null :
        <View style={styles.descView}>
          <Text style={styles.desc}>{ movie.description }</Text>
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

      <View style={styles.recommendCard}>
        <RecommendationsCard id={id} />
      </View>
      
    </ScrollView>
  )
}

export default DetailScreen