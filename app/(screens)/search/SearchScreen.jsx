import { View, Text, TextInput, Image } from 'react-native';
import React from 'react';
import styles from '../../components/searchScreen/searchScreen.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchScreen = () => {
  return (
    <View style={styles.root}>
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
    </View>
  )
}

export default SearchScreen