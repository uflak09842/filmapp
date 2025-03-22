import { View, Text, SafeAreaView, Switch, Button } from 'react-native';
import React, { useState } from 'react';
import styles from './SettingsScreen.style.js';
import { useAuth } from '../../../context/AuthContext.jsx';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  if(isEnabled) {
    //api çağrısı
  }

  return (
    <SafeAreaView style={styles}>
      <Text>SettingsScreen</Text>
      <Switch 
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Button title='Çıkış Yap' onPress={logout} />
    </SafeAreaView>
  )
}

export default SettingsScreen