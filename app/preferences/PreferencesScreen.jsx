import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './PreferencesScreen.style';
import { router } from 'expo-router';
import axiosInstance from '../components/axiosInstance';

export default function PreferencesScreen() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const data = [
    { id: 10751, name: "Aile" },
    { id: 28, name: "Aksiyon" },
    { id: 16, name: "Animasyon" },
    { id: 99, name: "Belgesel" },
    { id: 878, name: "Bilim-Kurgu" },
    { id: 18, name: "Dram" },
    { id: 14, name: "Fantastik" },
    { id: 53, name: "Gerilim" },
    { id: 9648, name: "Gizem" },
    { id: 35, name: "Komedi" },
    { id: 27, name: "Korku" },
    { id: 12, name: "Macera" },
    { id: 10402, name: "Müzik" },
    { id: 10749, name: "Romantik" },
    { id: 10752, name: "Savaş" },
    { id: 80, name: "Suç" },
    { id: 36, name: "Tarih" },
    { id: 10770, name: "TV Film" },
    { id: 37, name: "Vahşi Batı" }
  ];

  const toggleGenreSelection = (genreId) => {
    setSelectedGenres(prev => {
      if (prev.includes(genreId)) {
        return prev.filter(id => id !== genreId);
      } else if (prev.length >= 4) {
        return prev;
      }
      else {
        return [...prev, genreId];
      }
    });
  };

  const renderGenreItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.genreItem,
        selectedGenres.includes(item.id) && styles.selectedGenre
      ]}
      onPress={() => toggleGenreSelection(item.id)}
    >
      <Text style={[
        styles.genreName,
        selectedGenres.includes(item.id) && styles.selectedGenreText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const saveGenres = async () => {
    try {
      const response = await axiosInstance.post(process.env.EXPO_PUBLIC_SERVER_URL + '/setPreferences', {
        genres: selectedGenres
      });
      if (response.status === 200) {
        router.push('/home/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>En Çok Sevdiğiniz 4 Türü Seçin</Text>
        </View>

        <View style={styles.turView}>
          <FlatList
            data={data}
            renderItem={renderGenreItem}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false} // Scrollu ScrollView'a verdik
          />
          <TouchableOpacity 
            style={[
              styles.saveButton,
              selectedGenres.length === 0 && styles.disabledButton
            ]}
            disabled={selectedGenres.length === 0}
            onPress={saveGenres}
          >
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}