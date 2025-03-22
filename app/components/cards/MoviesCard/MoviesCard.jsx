import { View, Text, TextInput, Image, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './MoviesCard.style.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { router } from 'expo-router';

const MoviesCard = ({ props }) => {

  return (
    <FlatList 
        showsVerticalScrollIndicator={false}
        data={props}
        numColumns={3}
        renderItem={({item}) => {
        const handleSelect = (id) => {
            router.push({pathname: '/detail/DetailScreen', params: {id: id} });
        };

        return (
            <TouchableWithoutFeedback onPress={() => {handleSelect(item.id)}}>
            <View style={styles.listView}>
                <View style={styles.imageView}>
                <Image 
                    style={styles.image} 
                    source={{uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + item.poster }} 
                    defaultSource={require('../../../../assets/images/gray.png')}
                    resizeMode='cover'
                />
                </View>

                <View style={styles.mtView}>
                <Text
                    style={styles.mTitle}
                    numberOfLines={2}
                > 
                    {item.title} 
                </Text>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
        }}
    />
  )
}

export default MoviesCard