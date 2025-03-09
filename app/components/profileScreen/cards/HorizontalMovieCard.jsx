import { View, Text, ActivityIndicator, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './HorizontalMovieCard.style.js';
import axios from 'axios';
import axiosInstance from '../../axiosInstance.js';
import { router } from 'expo-router';

export default HorizontalMovieCard = ({movies, title}) => {

  if(!movies) return <ActivityIndicator size={50} />

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title || 'Filmler'}</Text>
      </View>

      <View>
        <FlatList 
          data={movies}
          horizontal={true}
          renderItem={({item}) => {
            const handleSelect = (id) => {
              router.push({pathname: '/detail/DetailScreen', params: {id: id} });
            };

            return(
              <TouchableWithoutFeedback onPress={() => {handleSelect(item.id)}}>
                <View style={styles.flatlist}>
                  <View style={styles.imageView}>
                    <Image 
                      style={styles.filmler} 
                      source={{uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + item.poster }} 
                      loadingIndicatorSource={{uri: process.env.EXPO_PUBLIC_LOW_IMAGE_URL + item.poster }}
                      resizeMode='cover'
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )

          }}
        />
      </View>
    </View>
  )
}