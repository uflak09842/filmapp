import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './MoviesCard.style.js';
import { router } from 'expo-router';

const MoviesCard = ({
  data,
  onEndReached,
  refreshing,
  onRefresh,
  loading,
  onLongPress,
  onDelete
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleSelect = (id) => {
    router.push({pathname: '/detail/DetailScreen', params: {id: id}});
  };

  const renderFooter = () => {
    if (!loading) return null;
   
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" style={{backgroundColor:'#F2F3F4', width:'100%'}} />
      </View>
    );
  };

  const handleLongPress = (movie) => {
    setSelectedId(movie.id || movie.mvId);
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const showSuccessMessage = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        "Film başarıyla silindi",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      // iOS için Modal gösterelim
      setSuccessModalVisible(true);
    }
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const confirmDelete = async () => {
    if (onDelete && selectedId !== null) {
      try {
        await onDelete(selectedId);
        
        const updatedData = localData.filter(
          item => (item.id || item.mvId) !== selectedId
        );
        setLocalData(updatedData);
        
        showSuccessMessage();
        
        if (onRefresh) {
          setTimeout(() => {
            onRefresh();
          }, 100);
        }
      } catch (error) {
        console.error("Film silinirken hata oluştu:", error.response.data.msg);
        showErrorMessage(error.response.data.msg || "Film silinirken bir sorun oluştu");
      }
    }
    setModalVisible(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedId(null);
  };
 
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item.id ? item.id : item.mvId)}
      onLongPress={onLongPress ? () => handleLongPress(item) : null}
      delayLongPress={200}
      style={styles.listView}
    >
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + item.poster}}
          defaultSource={require('../../../../assets/images/gray.png')}
          resizeMode='cover'
        />
      </View>
      <View style={styles.mtView}>
        <Text
          style={styles.mTitle}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#F2F3F4'}}>
      <FlatList
        data={localData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `movie-${item.id || item.mvId}-${index}`}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={renderFooter}
      />
     
      {/* Silme onaylama modalı */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filmi Sil</Text>
            {selectedMovie && (
              <Text style={styles.modalText}>
                "{selectedMovie.title}" filmini listenizden silmek istediğinize emin misiniz?
              </Text>
            )}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancel]}
                onPress={cancelDelete}
              >
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.delete]}
                onPress={confirmDelete}
              >
                <Text style={styles.buttonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Hata modalı */}
      <Modal
        animationType="fade"
        transparent
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Hata</Text>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.fullWidthButton]}
                onPress={() => setErrorModalVisible(false)}
              >
                <Text style={styles.buttonText}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Başarı modalı (iOS için) */}
      <Modal
        animationType="fade"
        transparent
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Başarılı</Text>
            <Text style={styles.modalText}>Film başarıyla silindi</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.fullWidthButton]}
                onPress={() => setSuccessModalVisible(false)}
              >
                <Text style={styles.buttonText}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MoviesCard;