import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const DetailScreen = () => {
  const mv = useLocalSearchParams();

  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  )
}

export default DetailScreen