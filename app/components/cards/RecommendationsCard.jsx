import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import useGet from '../hooks/normalServer/useGet';

const RecommendationsCard = ({ id }) => {

  const {loading, error, data } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/recommendMovies`, { id })

  if(loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
          <ActivityIndicator size="large" />
      </View>
    )
  };

  if(error) return

  if(data.length === 0) null;

  const handleSelect = (id) => {
    router.push({pathname: '/detail/DetailScreen', params: {id: id} })
  };

  return (
    <View style={styles.root}>
      <View style={styles.titlePanel}>
          <Text style={styles.title}>Önerilen Filmler</Text>
      </View>

      <FlatList 
          data={data}
          horizontal={true}
          renderItem={({item}) => {
            return(
                <TouchableWithoutFeedback onPress={() => handleSelect(item.id)}>
                    <View style={styles.flatlist}>
                        <Image 
                          source={{
                            uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + item.poster_path
                          }} 
                          style={styles.filmler} resizeMode={"cover"}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )
          }}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  root: {
    width: Dimensions.get('window').width,
    backgroundColor: "#D8C4B6",
    borderColor: '#4F709C',
    borderTopWidth: 3,
    borderBottomWidth: 3
  },

  titlePanel: {
    marginTop: 5,
    marginLeft: 5,
  },

  title: {
    fontSize: 20,
    textShadowRadius: 6,
    textShadowColor: "white",
    textShadowOffset: {width: 0.5, height: 0.5},
  },

  flatlist: {
    margin: 10,
    paddingVertical: 10
  },

  filmler: {
    height: 150,
    width: 100,
    borderWidth: 1,
    borderRadius: 2
  },
})

export default RecommendationsCard;