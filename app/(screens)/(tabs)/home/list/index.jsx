import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Modal, 
  Alert,
  Animated,
  TouchableHighlight,
  Dimensions,
  TextInput
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import axiosInstance from '../../../../components/axiosInstance';

const { width } = Dimensions.get('window');

const UserLists = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/userLists`);
        setData(response.data);
        setFilteredData(response.data);
        setRefreshing(false);
      } catch (error) {
        console.error('Error fetching user lists:', error);
        setRefreshing(false);
      }
    }

    getData();
  }, [refreshing]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const deleteList = async (listId, listName) => {
    try {
      const response = await axiosInstance.delete(process.env.EXPO_PUBLIC_SERVER_URL + '/deleteList', {
        params: {
          listId
        }
      });
      setMsg(`"${listName}" listesi silindi.`);
      
      setModalVisible(false);
      setRefreshing(true);
    } catch (error) {
      console.error('Liste silinirken hata:', error);
    }
  };

  const navigateToListDetail = (listId) => {
    router.push({pathname: `/home/list/detail`, params: {
      listId
    }
  });
  };

  const handleLongPress = (item) => {
    setSelectedList(item);
    setModalVisible(true);
  };

  const handleRefresh = () => {
    if (!refreshing) {
      setRefreshing(true);
      setSearchQuery('');
    }
  };

  const renderListItem = ({ item }) => {
    const firstMovie = item.movies && item.movies.length > 0 ? item.movies[0] : null;
    const posterPath = firstMovie && firstMovie.poster ? firstMovie.poster : null;

    var posterWidth;
    if(item.movies.length <= 1) {
      posterWidth = 80;
    }
    else if(item.movies.length === 2) {
      posterWidth = 110;
    } else if(item.movies.length === 3) {
      posterWidth = 140;
    }
   
    return (
      <TouchableHighlight
        style={styles.listItem}
        underlayColor="#DDDDDD"
        onPress={() => navigateToListDetail(item.id)}
        onLongPress={() => handleLongPress(item)}
      >
        <View style={styles.listContent}>
          {posterPath ? (
            <View style={[styles.postersContainer, { width: posterWidth }]}>
              {item.movies.map((movie, index) => (
                <Image
                  key={movie.id}
                  source={{ uri: movie.poster ? `https://image.tmdb.org/t/p/w185${movie.poster}` : null }}
                  style={[
                    styles.posterImage,
                    { right: index * 30 }
                  ]}
                />
              ))}
            </View>
          ) : (
            <View style={styles.placeholderPoster}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          )}
          <View style={styles.listInfo}>
            <Text style={styles.listName}>{item.name}</Text>
            <Text style={styles.movieCount}>{item.movieCount} Film</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderEmptyComponent = () => {
    if (searchQuery.trim() !== '') {
      return (
        <View style={styles.centered}>
          <Text>"{searchQuery}" ile eşleşen liste bulunamadı.</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.centered}>
        <Text>Hiç liste bulunamadı.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Liste ara..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
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
      
      <Text style={{opacity: 0.3, alignSelf: 'center', margin: 5}}>İpucu: listeyi silmek için basılı tutun.</Text>
      
      <FlatList
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(item, index) => item.id.toString() + index}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={renderEmptyComponent}
      />
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Listeyi Sil</Text>
            <Text style={styles.modalText}>
              "{selectedList?.name}" listesini silmek istediğinize emin misiniz?
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => selectedList && deleteList(selectedList.id, selectedList.name)}
              >
                <Text style={styles.confirmButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#888',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postersContainer: {
    height: 120,
    flexDirection: 'row',
    marginRight: 10,
    width: 80,
  },
  posterImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'white'
  },
  placeholderPoster: {
    width: 70,
    height: 105,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    color: '#9e9e9e',
  },
  listInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  listName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  movieCount: {
    fontSize: 15,
    color: '#757575',
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  createButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
    width: 200,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Floating button
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  // Swipe to delete action
  deleteAction: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteActionText: {
    color: 'white',
    fontWeight: '600',
    padding: 10,
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    width: width * 0.8,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#ff3b30',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default UserLists;