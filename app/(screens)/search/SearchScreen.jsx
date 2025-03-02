import { View, Text, TextInput, Image, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../components/searchScreen/searchScreen.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { router } from 'expo-router';

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
                <FontAwesome size={25}  name='search' />
                <TextInput 
                    style={styles.input}
                    cursorColor={'#4F709C'}
                />
            </View>
        </View>

        <FlatList 
          showsVerticalScrollIndicator={false}
          data={movies}
          numColumns={3}
          renderItem={({item}) => {
            const handleSelect = (id) => {
              console.log('tıklandı: ' + id)
            }

            return (
              <TouchableWithoutFeedback onPress={() => {handleSelect(item.id)}}>
                <View style={styles.listView}>
                  <View style={styles.imageView}>
                    <Image 
                      style={styles.image} 
                      source={{uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`}} 
                      loadingIndicatorSource={{uri: `https://image.tmdb.org/t/p/w92${item.poster_path}`}}
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
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen