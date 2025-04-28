import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, FlatList, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';
import useGet from '../../../components/hooks/normalServer/useGet';

const PersonDetailScreen = () => {
  const { actorId } = useLocalSearchParams();

  const [profileImageLoading, setProfileImageLoading] = useState(true);
  const [movieCredits, setMovieCredits] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);

  const { loading, error, data: person } = useGet(`${process.env.EXPO_PUBLIC_SERVER_URL}/personDetails`, { actorId });

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPersonMovies`, {
          params: { actorId }
        });
        setMovieCredits(response.data.cast || []);
      } catch (err) {
        console.error('Error fetching movie credits:', err);
      }
    };

    if (person) {
      fetchMovieCredits();
    }
  }, [person]);

  if (loading) return <ActivityIndicator size={'large'} style={styles.loader} />;
  if (error) return (
    <View style={styles.errorContainer}>
      <FontAwesome name="exclamation-triangle" size={40} color="#e74c3c" />
      <Text style={styles.errorText}>Kişi bilgileri yüklenemedi</Text>
    </View>
  );
  if (!person) return (
    <View style={styles.errorContainer}>
      <FontAwesome name="user-times" size={40} color="#e74c3c" />
      <Text style={styles.errorText}>Kişi bulunamadı</Text>
    </View>
  );

  const calculateAge = () => {
    if (!person.birthday) return null;
    
    const birthDate = new Date(person.birthday);
    let endDate = new Date();
    
    if (person.deathday) {
      endDate = new Date(person.deathday);
    }
    
    let age = endDate.getFullYear() - birthDate.getFullYear();
    const m = endDate.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const truncateBio = (text, maxLength = 300) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <FontAwesome name='arrow-circle-left' color={'#333'} size={30} />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          {profileImageLoading && (
            <ActivityIndicator style={styles.imageLoader} size="large" />
          )}
          <Image
            style={styles.profileImage}
            source={
              person.profile_path ?
              {uri: `${process.env.EXPO_PUBLIC_HIGH_IMAGE_URL}${person.profile_path}`} :
              require('../../../../assets/images/gray.png')
            }
            resizeMode="cover"
            onLoadStart={() => setProfileImageLoading(true)}
            onLoadEnd={() => setProfileImageLoading(false)}
          />
        </View>
        
        <View style={styles.basicInfo}>
          <Text style={styles.name}>{person.name}</Text>
          
          <View style={styles.statsContainer}>
            {person.popularity && (
              <View style={styles.statItem}>
                <FontAwesome name="star" size={16} color="#f39c12" />
                <Text style={styles.statValue}>{person.popularity.toFixed(1)}</Text>
              </View>
            )}
            
            {calculateAge() && (
              <View style={styles.statItem}>
                <FontAwesome name="birthday-cake" size={16} color="#3498db" />
                <Text style={styles.statValue}>{calculateAge()}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.infoRows}>
            {person.birthday && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Doğum Tarihi:</Text>
                <Text style={styles.infoValue}>{formatDate(person.birthday)}</Text>
              </View>
            )}
            
            {person.deathday && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ölüm Tarihi:</Text>
                <Text style={styles.infoValue}>{formatDate(person.deathday)}</Text>
              </View>
            )}
            
            {person.place_of_birth && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Doğum Yeri:</Text>
                <Text style={styles.infoValue}>{person.place_of_birth}</Text>
              </View>
            )}
            
            {person.imdb_id && (
              <TouchableOpacity 
                style={styles.imdbButton}
                onPress={() => Linking.openURL(`https://www.imdb.com/name/${person.imdb_id}/`)}
              >
                <Text style={styles.imdbText}>IMDb Profilini Görüntüle</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      
      {person.biography && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biyografi</Text>
          <Text style={styles.biography}>
            {showFullBio ? person.biography : truncateBio(person.biography)}
          </Text>
          {person.biography.length > 300 && (
            <TouchableOpacity 
              style={styles.readMoreButton}
              onPress={() => setShowFullBio(!showFullBio)}
            >
              <Text style={styles.readMoreText}>
                {showFullBio ? 'Daha Az Göster' : 'Devamını Oku'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    
      {movieCredits.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filmografi</Text>
          <FlatList
            data={movieCredits}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            style={styles.movieScroll}
            renderItem={({ item: movie }) => (
              <TouchableOpacity
                style={styles.movieCard}
                onPress={() => router.push({pathname: '/detail/DetailScreen', params: {id: movie.id}})}
              >
                <Image
                  source={
                    movie.poster_path ?
                    {uri: `${process.env.EXPO_PUBLIC_HIGH_IMAGE_URL}${movie.poster_path}`} :
                    require('../../../../assets/images/gray.png')
                  }
                  style={styles.moviePoster}
                  resizeMode="cover"
                />
                <Text style={styles.movieTitle} numberOfLines={2}>{movie.title}</Text>
                {movie.character && (
                  <Text style={styles.characterName} numberOfLines={1}>
                    {movie.character}
                  </Text>
                )}
                {movie.release_date && (
                  <Text style={styles.releaseYear}>
                    {new Date(movie.release_date).getFullYear()}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}

    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
    marginTop: height * 0.4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.8,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#e74c3c',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImageContainer: {
    width: width * 0.35,
    height: width * 0.45,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  basicInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statValue: {
    marginLeft: 5,
    fontSize: 14,
  },
  infoRows: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: '500',
    width: 100,
    fontSize: 14,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
  },
  imdbButton: {
    backgroundColor: '#f3ce13',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  imdbText: {
    color: 'black',
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  biography: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  readMoreButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  readMoreText: {
    color: '#3498db',
    fontWeight: '500',
  },
  movieScroll: {
    marginTop: 10,
  },
  movieCard: {
    width: 120,
    marginRight: 15,
  },
  moviePoster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  characterName: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  releaseYear: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});

export default PersonDetailScreen;