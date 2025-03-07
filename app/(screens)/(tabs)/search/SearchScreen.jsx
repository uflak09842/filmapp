import { View, Text, TextInput, Image, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../../components/searchScreen/searchScreen.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { router } from 'expo-router';
import MoviesCard from '../../../components/cards/MoviesCard/MoviesCard';

const SearchScreen = () => {
  const [ movies, setMovies ] = useState();

  useEffect(() => {
      const getMovies = async () => {
          const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPopular`); 

          setMovies(response.data);
      };

      getMovies();
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.titleView}>
            <View style={styles.titleContainer}>
                <FontAwesome size={20}  name='search' color={'#4F709C'} />
                <TextInput 
                    style={styles.input}
                    cursorColor={'#4F709C'}
                    placeholder='Ara..'
                />
            </View>
        </View>

        <MoviesCard props={movies} />
        
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen