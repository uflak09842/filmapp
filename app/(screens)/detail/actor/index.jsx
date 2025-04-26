import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

const index = () => {
    const { id } = useLocalSearchParams();

    console.log(id); // https://www.imdb.com/name/{imdb_id} get this from server

    return (
        <View>
        <Text>index</Text>
        </View>
    )
}

export default index