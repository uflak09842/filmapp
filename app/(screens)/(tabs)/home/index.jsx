import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../components/axiosInstance';
import styles from '../../../components/homeScreen/homeScreen.styles';
import { router, Redirect } from 'expo-router';
import MoviesCard from '../../../components/cards/MoviesCard/MoviesCard';

const Home = () => {
  
  const [ movies, setMovies ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ hasMore, setHasMore ] = useState(true);

  const fetchMovies = async (pageNum = 1, shouldRefresh = false) => {
    if (loading) return;
    
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/recommendations?page=${pageNum}&limit=12`
      );
      
      const { results, page: currentPage, totalPages } = response.data;
      
      setTotalPages(totalPages);
      setPage(currentPage);
      setHasMore(currentPage < totalPages);
      
      if (shouldRefresh) {
        setMovies(results);
      } else {
        setMovies(prevMovies => [...prevMovies, ...results]);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, true);
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchMovies(page + 1);
    }
  };

  const handleRefresh = () => {
    if (!refreshing) {
      setRefreshing(true);
      fetchMovies(1, true);
    }
  };

  if (!movies.length && loading) {
    return (
      <ActivityIndicator 
        size='large' 
        style={{flex: 1, alignSelf: 'center', backgroundColor: '#F2F3F4', width: '100%'}} 
      />
    );
  }

  return (
      <View style={styles.root}>
        <MoviesCard 
          data={movies} 
          onEndReached={handleLoadMore}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          loading={loading}
        />
      </View>
    
  )
}

export default Home