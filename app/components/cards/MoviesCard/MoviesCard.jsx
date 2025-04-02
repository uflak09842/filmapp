import { 
    View, 
    Text, 
    Image, 
    FlatList, 
    TouchableWithoutFeedback,
    ActivityIndicator 
  } from 'react-native';
  import React from 'react';
  import styles from './MoviesCard.style.js';
  import { router } from 'expo-router';
  
  const MoviesCard = ({ 
    data, 
    onEndReached, 
    refreshing, 
    onRefresh, 
    loading 
  }) => {
    const handleSelect = (id) => {
      router.push({pathname: '/detail/DetailScreen', params: {id: id}});
    };
  
    const renderFooter = () => {
      if (!loading) return null;
      
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="large" color="#4F709C" />
        </View>
      );
    };
  
    const renderItem = ({ item }) => (
      <TouchableWithoutFeedback onPress={() => handleSelect(item.id)}>
        <View style={styles.listView}>
          <View style={styles.imageView}>
            <Image 
              style={styles.image} 
              source={{uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + item.poster}} 
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
    );
  
    return (
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `movie-${item.id}-${index}`}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={renderFooter}
      />
    );
  };
  
  export default MoviesCard;