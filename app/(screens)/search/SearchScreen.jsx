import { View, Text, TextInput, Image, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import styles from '../../components/searchScreen/searchScreen.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';

const SearchScreen = () => {

    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPopular`); 

            console.log(response.data);
        }

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

        <Text>asd</Text>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen