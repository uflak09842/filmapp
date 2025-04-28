import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity, StatusBar, ImageBackground, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

import langCodes from './components/langCodes';
import useGet from '../../components/hooks/normalServer/useGet';
import ErrorCard from '../../components/infoCards/ErrorCard';
import CompaniesCard from '../../components/cards/CompaniesCard';
import axiosInstance from '../../components/axiosInstance';
import HorizontalMovieCard from '../../components/profileScreen/cards/HorizontalMovieCard';
import ActorCard from '../../components/profileScreen/cards/ActorCard';

const { width, height } = Dimensions.get('window');

const DetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [bgLoad, setBgLoad] = useState(true);
  const [posterLoad, setPosterLoad] = useState(true);
  const [like, setLike] = useState(false);
  const [watched, setWatch] = useState(false);
  const [frontError, setFrontError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { loading, error, data: movie } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/getMovie`, { id });
  const { loading: recommendLoading, error: recommendError, data } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/recommendMovies`, { id });
  const { loading: actorLoading, error: actorError, data: actorData } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/credits`, { id });

  useEffect(() => {
    const getStates = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getDetailStates`, {
          params: { id }
        });
        setLike(response.data.liked);
        setWatch(response.data.watched);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    }

    getStates();
  }, [id]);

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <ActivityIndicator size="large" color="#4F709C" />
    </View>
  );
  
  if (error) return <ErrorCard desc={error || 'Bilinmeyen Hata'} />;
  if (!movie) return <ErrorCard desc={'Film Bulunamadı'} />;

  const { mvId, release, genres, productions } = movie;
  const language = langCodes[movie.language] || movie.language || 'Bulunamadı';
  
  const handleLike = async () => {
    if (like) {
      setFrontError(null);
      setLike(false);
      try {
        await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/deleteLike`, { mvId });
      } catch (err) {
        console.error(err);
      }
    } else {
      setFrontError(null);
      setLike(true);

      if (!watched) {
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
        await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/addLike`, { mvId });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleWatch = async () => {
    if (watched && like) {
      setFrontError('Beğeninizi Kaldırmadan İzleme Durumunu Değiştiremezsiniz');
      return;
    }

    if (watched) {
      setWatch(false);
      try {
        await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/deleteWatch`, { mvId });
      } catch (err) {
        console.error(err);
      }
    } else {
      setWatch(true);
      try {
        await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/addWatch`, { mvId });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F3F4' }}>
      
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={{ height: height * 0.55, position: 'relative' }}>
          {bgLoad && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
              <ActivityIndicator size="large" color="#4F709C" />
            </View>
          )}
          
          <ImageBackground
            source={{ uri: process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + movie.backdrop }}
            style={{ width: '100%', height: '100%' }}
            onLoadStart={() => setBgLoad(true)}
            onLoadEnd={() => setBgLoad(false)}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.8)', '#FFFFFF']}
              style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}
            >

              <TouchableOpacity 
                style={{ position: 'absolute', top: 50, right: 20, zIndex: 10 }}
                onPress={() => router.push('/search/SearchScreen')}
              >
                <View style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: 8, borderWidth: 1, borderColor: '#4F709C' }}>
                  <FontAwesome name="arrow-left" size={24} color="#4F709C" />
                </View>
              </TouchableOpacity>
              
              <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'flex-end' }}>

                <View style={{ 
                  marginRight: 15, 
                  borderRadius: 8, 
                  overflow: 'hidden', 
                  width: width * 0.28, 
                  height: width * 0.42, 
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  borderWidth: 2,
                  borderColor: '#4F709C'
                }}>
                  {posterLoad && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                      <ActivityIndicator size="small" color="#4F709C" />
                    </View>
                  )}
                  <Image
                    source={{ uri: process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + movie.poster }}
                    style={{ width: '100%', height: '100%' }}
                    onLoadStart={() => setPosterLoad(true)}
                    onLoadEnd={() => setPosterLoad(false)}
                  />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>
                    {movie.title}
                  </Text>
                  
                  {movie.tagline ? (
                    <Text style={{ fontSize: 14, color: '#555', marginBottom: 8, fontStyle: 'italic' }}>
                      "{movie.tagline}"
                    </Text>
                  ) : null}
                  
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, color: '#555' }}>{language} • {release}</Text>
                  </View>
                  
                  <Text style={{ fontSize: 14, color: '#555', marginBottom: 10 }}>{genres}</Text>
                  
                  <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <TouchableOpacity 
                      onPress={handleLike}
                      style={{ 
                        backgroundColor: like ? '#4F709C' : 'rgba(79, 112, 156, 0.1)', 
                        paddingVertical: 8, 
                        paddingHorizontal: 12, 
                        borderRadius: 20, 
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: like ? '#4F709C' : 'rgba(79, 112, 156, 0.3)',
                        zIndex: 10
                      }}
                    >
                      <FontAwesome name={like ? 'heart' : 'heart-o'} size={16} color={like ? 'white' : '#4F709C'} />
                      <Text style={{ color: like ? 'white' : '#4F709C', marginLeft: 5, fontWeight: '500' }}>
                        {like ? 'Beğenildi' : 'Beğen'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={handleWatch}
                      style={{ 
                        backgroundColor: watched ? '#D8C4B6' : 'rgba(216, 196, 182, 0.2)', 
                        paddingVertical: 8, 
                        paddingHorizontal: 12, 
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: watched ? '#D8C4B6' : 'rgba(216, 196, 182, 0.5)',
                        zIndex: 10,
                      }}
                    >
                      <FontAwesome name={watched ? 'eye' : 'eye-slash'} size={16} color={watched ? 'white' : '#D8C4B6'} />
                      <Text style={{ color: watched ? 'white' : '#D8C4B6', marginLeft: 5, fontWeight: '500' }}>
                        {watched ? 'İzlendi' : 'İzlemedim'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        
        {frontError ? (
          <View style={{ 
            backgroundColor: 'rgba(255, 76, 76, 0.1)', 
            padding: 15, 
            margin: 20, 
            borderRadius: 8, 
            borderLeftWidth: 3, 
            borderLeftColor: '#FF4C4C' 
          }}>
            <Text style={{ color: '#FF4C4C' }}>{frontError}</Text>
          </View>
        ) : null}
        
        {movie.description ? (
          <View style={{ 
            paddingHorizontal: 20, 
            marginTop: 15,
            backgroundColor: '#F7F7F7',
            paddingVertical: 15,
            marginHorizontal: 15,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E0E0E0'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>Özet</Text>
            <Text 
              style={{ fontSize: 15, color: '#555', lineHeight: 22 }}
              numberOfLines={showFullDescription ? undefined : 4}
            >
              {movie.description}
            </Text>
            {movie.description.length > 150 && (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
                  <Text style={{ color: '#4F709C', fontWeight: '500' }}>
                    {showFullDescription ? 'Daha Az Göster' : 'Devamını Oku'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : null}

        {actorData && actorData.length > 0 ? (
          <View style={{ marginTop: 25 }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              paddingHorizontal: 20,
              marginBottom: 15
            }}>
              <View style={{ 
                height: 20, 
                width: 4, 
                backgroundColor: '#4F709C', 
                marginRight: 8,
                borderRadius: 2
              }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                Oyuncular
              </Text>
            </View>
            <FlatList 
              data={actorData}
              keyExtractor={(item, index) => `actor-${item.id}-${index}`}
              renderItem={({item}) => <ActorCard actor={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            />
          </View>
        ) : null}

        {productions && productions.length > 0 ? (
          <View style={{ marginTop: 25 }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              paddingHorizontal: 20,
              marginBottom: 15
            }}>
              <View style={{ 
                height: 20, 
                width: 4, 
                backgroundColor: '#4F709C', 
                marginRight: 8,
                borderRadius: 2
              }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                Yapım Şirketleri
              </Text>
            </View>
            <FlatList 
              data={productions}
              keyExtractor={(item, index) => `company-${item.id}-${index}`}
              renderItem={({item}) => <CompaniesCard name={item.name} logo={item.logo_path} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            />
          </View>
        ) : null}
        
        {data && data.length > 0 ? (
          <View style={{ marginTop: 25, marginBottom: 30 }}>
            <HorizontalMovieCard movies={data} title={'Önerilen Filmler'} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default DetailScreen;