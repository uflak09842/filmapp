import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const EditProfileForm = () => {
  return (
    <View>
        <Text>EditProfileForm</Text>
        <Button title='asd' onPress={() => router.push('/profile/ProfileScreen')} />
    </View>
  )
}

export default EditProfileForm