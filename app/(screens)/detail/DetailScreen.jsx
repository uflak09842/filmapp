import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';

import langCodes from './components/langCodes';
import useGet from '../../components/hooks/normalServer/useGet';
import ErrorCard from '../../components/infoCards/ErrorCard';
import styles from './detailScreen.style';
import CompaniesCard from '../../components/cards/CompaniesCard';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from '../../components/axiosInstance';
import HorizontalMovieCard from '../../components/profileScreen/cards/HorizontalMovieCard';
import ActorCard from '../../components/profileScreen/cards/ActorCard';

const DetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [ bgLoad, setBgLoad ] = useState(true);
  const [ posterLoad, setPosterLoad ] = useState(true);

  const [like, setLike ] = useState(false);
  const [watched, setWatch ] = useState(false);

  const [ frontError, setFrontError ] = useState(null);

  const { loading, error, data: movie } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`, { id });
  const { loading: recommendLoading, error: recommendError, data } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/recommendMovies`, { id });
  const { loading: actorLoading, error: actorError, data: actorData } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/credits`, { id });

  useEffect(() => {
    const getStates = async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getDetailStates`, {
        params: { id }
      });

      setLike(response.data.liked);
      setWatch(response.data.watched);
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
      setFrontError(null);
      setLike(false);
      try {
        const response = await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/deleteLike`, { mvId });
      } catch (err) {
        console.error(err);
      }
    } else {
      setFrontError(null);
      setLike(true);

      if(!watched) {
        setWatch(true);

        try {
          await axiosInstance.post(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/addWatch`,
            { mvId }
          );
        } catch (err) {
          console.error(err);
        }
      }
      
      try {
        const response = await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/addLike`, { mvId })
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handleWatch = async () => {
    if(watched && like) {
      setFrontError('Beğeninizi Kaldırmadan İzleme Durumunu Değiştiremezsiniz');
      return;
    }

    if(watched) {
      setWatch(false);
      try {
        const response = await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/deleteWatch`, { mvId })
      } catch (err) {
        console.error(err);
      }
    } else {
      setWatch(true);

      try {
        const response = await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/addWatch`, { mvId })
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <View style={styles.bdView}>
        <TouchableOpacity style={styles.geriDon} onPress={() => router.push('/search/SearchScreen')}>
          <FontAwesome name='arrow-circle-left' color={'white'} size={30} />
        </TouchableOpacity>
        
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

        <TouchableOpacity onPress={() => {handleWatch()}}>
          <View style={styles.reactBox}>
            {
              watched ? <FontAwesome name='eye' size={50} /> :
              <FontAwesome name='eye-slash' size={50} />
            }
          </View>
        </TouchableOpacity>
        
      </View>
      
      {
        frontError ?
        <View style={styles.errorView}>
          <Text style={styles.error}>{frontError}</Text>
        </View> :
        null
      }
      
      {
        !movie.description || movie.description === null ?
        null :
        <View style={styles.descView}>
          <Text style={styles.desc}>{ movie.description }</Text>
        </View>
      }

      {
        actorData ?
        <View style={styles.actorView}>
          <FlatList 
            data={actorData}
            keyExtractor={(item, index) => `actor-${item.id}-${index}`}
            renderItem={({item}) => <ActorCard actor={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actorCard}
          />
        </View>
        : null
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
        <HorizontalMovieCard movies={data} title={'Önerilen Filmler'} />
      </View>
      
    </ScrollView>
  )
}

export default DetailScreen