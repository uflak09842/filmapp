import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const HorizontalMovieCard = ({movies, title, loading}) => {
  const [imageLoading, setImageLoading] = useState(true);

  if (!movies) return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color="#4F709C" />
    </View>
  );

  const handleSelect = (id) => {
    router.push({pathname: '/detail/DetailScreen', params: {id: id} });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity 
        onPress={() => handleSelect(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.movieCard}>
          <View style={styles.imageContainer}>
            {imageLoading && (
              <View style={styles.imageLoader}>
                <ActivityIndicator size="small" color="#4F709C" />
              </View>
            )}
            <Image
              style={styles.posterImage}
              source={{uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + item.poster }}
              defaultSource={require('../../../../assets/images/gray.png')}
              resizeMode='cover'
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
          </View>
          <Text
            style={styles.movieTitle}
            numberOfLines={1}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
      <View style={styles.titleContainer}>
        <View style={styles.titleIndicator} />
        <Text style={styles.sectionTitle}>{title || 'Filmler'}</Text>
      </View>
      <FlatList
        data={movies}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => `horizontal-movie-${item.id}-${index}`}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#F7F7F7',
    marginVertical: 10,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  titleIndicator: {
    width: 4,
    height: 20,
    backgroundColor: '#4F709C',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  movieCard: {
    width: 120,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  imageContainer: {
    width: 110,
    height: 165,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4F709C',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  movieTitle: {
    color: '#333',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    width: '100%',
  },
  footerLoader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default HorizontalMovieCard;