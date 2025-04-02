import { View, Text, ActivityIndicator, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import styles from './HorizontalMovieCard.style.js';
import { router } from 'expo-router';

export default HorizontalMovieCard = ({movies, title, loading}) => {
  if (!movies) return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color="#4F709C" />
    </View>
  );

  const handleSelect = (id) => {
    router.push({pathname: '/detail/DetailScreen', params: {id: id} });
  };

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => handleSelect(item.id)}>
      <View style={styles.flatlist}>
        <View style={styles.imageView}>
          <Image 
            style={styles.filmler} 
            source={{uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + item.poster }} 
            defaultSource={require('../../../../assets/images/gray.png')}
            resizeMode='cover'
          />
        </View>
        <Text
          style={styles.movieTitle}
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4F709C" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title || 'Filmler'}</Text>
      </View>

      <FlatList 
        data={movies}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => `horizontal-movie-${item.id}-${index}`}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};