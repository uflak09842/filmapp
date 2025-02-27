import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { useAuth } from '../../context/AuthContext'
import { LoginSchema } from '../../components/authSchema';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { login, register } = useAuth();

  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login