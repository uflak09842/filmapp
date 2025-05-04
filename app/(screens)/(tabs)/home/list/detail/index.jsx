import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Modal, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axiosInstance from '../../../../../components/axiosInstance';
import cardStyles from '../../../../../components/cards/MoviesCard/MoviesCard.style.js';

const Index = () => {
  const { listId } = useLocalSearchParams();
  const router = useRouter();
  
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [refresh, setRefresh ] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axiosInstance.get(
          process.env.EXPO_PUBLIC_SERVER_URL + '/listDetails',
          { params: { listId } }
        );
        setData(response.data);
        setFilteredMovies(response.data.movies || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    })();
  }, [refresh]);

  useEffect(() => {
    if (data?.movies) {
      const filt = data.movies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filt);
    }
  }, [searchQuery, data.movies]);

  const handleLongPress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handlePress = (movie) => {
    router.push({pathname: '/detail/DetailScreen', params: {id: movie.id}});
  };

  const handleDelete = async () => {
    if (!selectedMovie) return;
    setModalVisible(false);
    setLoading(true);
    try {
      await axiosInstance.delete(
        process.env.EXPO_PUBLIC_SERVER_URL + '/listedenKaldir',
        { params: { listId, movieId: selectedMovie.id } }
      );
      const updated = data.movies.filter(m => m.id !== selectedMovie.id);
      setData({ ...data, movies: updated });
      setFilteredMovies(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSelectedMovie(null);
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      onPress={() => handlePress(item)}
      delayLongPress={200}
      style={cardStyles.listView}
    >
      <View style={cardStyles.imageView}>
        <Image 
          style={cardStyles.image}
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster}`}}
          defaultSource={require('../../../../../../assets/images/gray.png')}
          resizeMode='cover'
        />
      </View>
      <View style={cardStyles.mtView}>
        <Text style={cardStyles.mTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !data?.movies?.length) {
    return (
      <ActivityIndicator
        size='large'
        style={{flex:1, alignSelf:'center', backgroundColor:'#F2F3F4', width:'100%'}}
      />
    );
  }

  const handleRefresh = () => {
    if (!refresh) {
      setRefresh(true);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.listTitle}>{data.name || 'Film Listesi'}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Listede ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.movieList}
          showsVerticalScrollIndicator={false}
          refreshing={refresh}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {searchQuery ? 'Arama sonucu bulunamadı.' : 'Bu listede henüz film yok.'}
          </Text>
        </View>
      )}
      
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filmi Listeden Kaldır</Text>
            {selectedMovie && (
              <Text style={styles.modalText}>
                "{selectedMovie.title}" filmini kaldırmak istediğinize emin misiniz?
              </Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={styles.deleteButtonText}>Kaldır</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
  },
  listTitle: { fontSize: 18, fontWeight: 'bold' },
  backButton: { padding: 8 },
  backButtonText: { fontSize: 16, color: '#007AFF' },

  searchContainer: {
    position: 'relative',
    padding: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    top: 16,
    padding: 4,
  },
  clearButtonText: { fontSize: 16, color: '#888' },

  movieList: { padding: 8 },
  movieCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    maxWidth: '47%',
  },
  poster: { width: '100%', height: 200 },
  movieTitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  emptyState: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  emptyStateText: { fontSize: 16, color: '#666', textAlign: 'center' },

  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 20, width: '90%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', width: '100%' },
  modalButton: {
    flex: 1, paddingVertical: 12, borderRadius: 8,
    alignItems: 'center', marginHorizontal: 5,
  },
  cancelButton: { backgroundColor: '#F2F2F2' },
  cancelButtonText: { color: '#333', fontWeight: '500' },
  deleteButton: { backgroundColor: '#FF3B30' },
  deleteButtonText: { color: '#FFF', fontWeight: '500' },
});

export default Index;