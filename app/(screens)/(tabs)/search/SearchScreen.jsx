import { View, Text, TextInput, Image, SafeAreaView, FlatList, TouchableWithoutFeedback, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../../components/searchScreen/searchScreen.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { router } from 'expo-router';
import MoviesCard from '../../../components/cards/MoviesCard/MoviesCard';
import useGet from '../../../components/hooks/normalServer/useGet';
import ErrorCard from '../../../components/infoCards/ErrorCard';

const SearchScreen = () => {
  const [ movies, setMovies ] = useState();

  const [ search, setSearch ] = useState("");
  const [ submit, setSubmit ] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
      const getMovies = async () => {
        try {
          if(submit && search !== "") {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getSearch`, {
              params: { search }
            })
            
            setMovies(response.data);
          } else {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPopular`); 
            setMovies(response.data.results);
          }
        } catch (err) {
          console.error(err);
        }
      };

      getMovies();
  }, [submit])

  useEffect(() => {
    if(movies && movies.length === 0) {
      setModalVisible(true);
    }
  }, [movies])

  if(!movies) return <ActivityIndicator size={'large'} style={{flex: 1, alignSelf: 'center', backgroundColor: '#F5EFE7', width: '100%'}} />

  const handleSearch = () => {
    setSubmit(true);
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
                  setSubmit(false);
                  setSearch("");
                }}>
                <Text style={[styles.modalText, {color: 'white'}]}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.titleView}>
            <View style={styles.titleContainer}>
                <FontAwesome size={20}  name='search' color={'#4F709C'} />
                <TextInput 
                    style={styles.input}
                    cursorColor={'#4F709C'}
                    placeholder='Ara..'
                    onChangeText={text => {
                      setSearch(text);
                      if (text === "") {
                        setSubmit(false);
                      }
                    }}
                    onSubmitEditing={() => handleSearch()}
                    value={search}
                />
            </View>
        </View>

        <MoviesCard props={movies} />
        
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen