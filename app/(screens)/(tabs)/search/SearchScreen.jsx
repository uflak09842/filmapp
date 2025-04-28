import { View, Text, TextInput, Image, SafeAreaView, FlatList, TouchableWithoutFeedback, ActivityIndicator, Modal, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../../components/searchScreen/searchScreen.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { router } from 'expo-router';
import MoviesCard from '../../../components/cards/MoviesCard/MoviesCard';
import useGet from '../../../components/hooks/normalServer/useGet';
import ErrorCard from '../../../components/infoCards/ErrorCard';

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [submit, setSubmit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum = 1, shouldRefresh = false) => {
    if (loading) return;
    
    try {
      setLoading(true);
      let response;
      
      if(submit && search !== "") {
        response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getSearch`, {
          params: { 
            search,
            page: pageNum,
            limit: 18
          }
        });
      } else {
        response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPopular`, {
          params: {
            page: pageNum,
            limit: 18
          }
        });
      }
      
      const { results, page: currentPage, totalPages } = response.data;
      
      if (results.length === 0 && pageNum === 1) {
        setModalVisible(true);
      }
      
      setTotalPages(totalPages);
      setPage(currentPage);
      setHasMore(currentPage < totalPages);
      
      if (shouldRefresh) {
        setMovies(results);
      } else {
        setMovies(prevMovies => [...prevMovies, ...results]);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, true);
  }, [submit]);

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

  const handleSearch = () => {
    setSubmit(true);
  }

  const handleClear = () => {
    if(!submit) return;

    setSubmit(false);
    setSearch("");
    setRefreshing(true);
  }

  if (!movies.length && loading) {
    return (
      <ActivityIndicator 
        size='large' 
        style={{flex: 1, alignSelf: 'center', backgroundColor: '#F2F3F4', width: '100%'}} 
      />
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <View style={styles.modalInnerView}>
              <Text style={styles.modalTitle}>Film Bulunamadı.</Text>
              <Text style={styles.modalText}>Doğru Yazdığınızdan Emin Misiniz ?</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleClear();
                }}>
                <Text style={[styles.modalText, {color: 'white'}]}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.titleView}>
          <View style={styles.titleContainer}>
            <FontAwesome size={20} name='search' color={'#4F709C'} />
            <TextInput 
              style={styles.input}
              cursorColor={'#4F709C'}
              placeholder='Ara..'
              onChangeText={text => {
                setSearch(text);
                if (text === "") {
                  handleClear();
                }
              }}
              onSubmitEditing={() => handleSearch()}
              value={search}
            />
            <TouchableOpacity onPress={handleClear}>
              <View style={styles.button}> 
                <Text style={styles.buttonText}>Temizle</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <MoviesCard 
          data={movies} 
          onEndReached={handleLoadMore}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen