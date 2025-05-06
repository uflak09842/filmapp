import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  ScrollView, 
  RefreshControl, 
  StyleSheet,
  Alert,
  TextInput,
  Switch
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../components/axiosInstance';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Kullanıcı adı çok kısa!')
    .max(20, 'Kullanıcı adı çok uzun!')
    .required('Kullanıcı adı gerekli'),
  currentPassword: Yup.string()
    .when('newPassword', {
      is: val => val && val.length > 0,
      then: () => Yup.string().required('Mevcut şifre gerekli'),
    }),
  newPassword: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .test('newPassword', 'Yeni şifre girilmemişse mevcut şifre de gerekmez', function (value) {
      if (!value) return true;
      return !!this.parent.currentPassword;
    }),
  selectedGenres: Yup.array()
    .min(1, 'En az bir tür seçmelisiniz')
    .required('En az bir tür seçmelisiniz'),
});

const ProfileScreen = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [backdrop, setBackdrop] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user`);
      setUser(response.data.user);
      setGenres(response.data.userGenres);
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
      Alert.alert("Hata", "Kullanıcı bilgileri yüklenirken bir hata oluştu.");
    }
  };

  const fetchAllGenres = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user`);
      setAllGenres(response.data.allGenres);
    } catch (error) {
      console.error("Tür bilgileri alınamadı:", error);
    }
  };

  const fetchBackdrop = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getPopular`);
      setBackdrop(response.data.results[0].backdrop);
    } catch (error) {
      console.error("Arka plan resmi alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAllGenres();
    fetchBackdrop();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleProfileUpdate = async (values) => {
    try {
      // Seçili genre ID'lerinin listesini oluştur (sadece values.selectedGenres'ten al)
      const selectedGenreIds = values.selectedGenres || [];

      // API'ye gönderilecek veriyi hazırla
      const updateData = {
        username: values.username,
        isAdult: values.isAdult,
        genres: selectedGenreIds,
      };

      // Şifre değişikliği varsa ekle
      if (values.currentPassword && values.newPassword) {
        updateData.currentPassword = values.currentPassword;
        updateData.newPassword = values.newPassword;
      }

      await axiosInstance.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/updateUser`, updateData);
      setIsEditing(false);
      fetchUserData();
      Alert.alert("Başarılı", "Profil bilgileriniz güncellendi.");
    } catch (error) {
      console.error("Profil güncelleme hatası:", error.response?.data?.message || error.message);
      Alert.alert("Hata", error.response?.data?.message || "Profil güncellenirken bir hata oluştu.");
    }
  };

  if (!user || !backdrop) {
    return <ActivityIndicator size={'large'} style={styles.loadingIndicator} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.backdropView}>
          <Image
            source={{ uri: process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + backdrop }}
            style={styles.backdrop}
          />
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{user.username.charAt(0).toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.userInfoContainer}>
          {!isEditing ? (
            <>
              <View style={styles.userHeader}>
                <View>
                  <Text style={styles.username}>{user.username}</Text>
                  <Text style={styles.email}>{user.email}</Text>
                  <Text style={styles.createdAt}>Üyelik: {new Date(user.created_at).toLocaleDateString('tr-TR')}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                  <FontAwesome name="pencil" size={16} color="#FFF" />
                  <Text style={styles.editButtonText}>Düzenle</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tercihler</Text>
                <View style={styles.preferencesContainer}>
                  <View style={styles.preferenceItem}>
                    <Text style={styles.preferenceLabel}>Yaş Kısıtlaması:</Text>
                    <Text style={styles.preferenceValue}>
                      {user.isAdult ? "Yetişkin İçerik (18+)" : "Genel İçerik"}
                    </Text>
                  </View>
                  
                  <View style={styles.preferenceItem}>
                    <Text style={styles.preferenceLabel}>Ülke:</Text>
                    <Text style={styles.preferenceValue}>{user.uc_iso || "Belirtilmemiş"}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tercih Edilen Türler</Text>
                <View style={styles.genresContainer}>
                  {genres.length > 0 ? (
                    genres.map((genre) => (
                      <View key={genre.genre_id} style={styles.genreTag}>
                        <Text style={styles.genreText}>{genre.genre_name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noGenresText}>Henüz tür seçimi yapılmamış</Text>
                  )}
                </View>
              </View>
            </>
          ) : (
            <Formik
              initialValues={{
                username: user.username,
                isAdult: user.isAdult === 1 || user.isAdult === true,
                currentPassword: '',
                newPassword: '',
                selectedGenres: genres.map(genre => Number(genre.genre_id))
              }}
              validationSchema={UpdateProfileSchema}
              onSubmit={handleProfileUpdate}
            >
              {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
                <View style={styles.formContainer}>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profil Bilgileri</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
                      <TextInput
                        style={styles.input}
                        value={values.username}
                        onChangeText={handleChange('username')}
                        placeholder="Kullanıcı adınız"
                      />
                      {errors.username && touched.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                      )}
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>E-posta</Text>
                      <Text style={styles.readOnlyField}>{user.email}</Text>
                      <Text style={styles.helperText}>E-posta değiştirilemez</Text>
                    </View>
                    
                    <View style={styles.switchContainer}>
                      <Text style={styles.switchLabel}>Yetişkin İçerik (18+)</Text>
                      <Switch
                        value={values.isAdult}
                        onValueChange={(value) => setFieldValue('isAdult', value)}
                        trackColor={{ false: '#D1D1D1', true: '#4F709C' }}
                        thumbColor={values.isAdult ? '#FFF' : '#FFF'}
                      />
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Şifre Değiştir</Text>
                    <Text style={styles.helperText}>Şifrenizi değiştirmek istemiyorsanız boş bırakın</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Mevcut Şifre</Text>
                      <TextInput
                        style={styles.input}
                        value={values.currentPassword}
                        onChangeText={handleChange('currentPassword')}
                        placeholder="Mevcut şifreniz"
                        secureTextEntry
                      />
                      {errors.currentPassword && touched.currentPassword && (
                        <Text style={styles.errorText}>{errors.currentPassword}</Text>
                      )}
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Yeni Şifre</Text>
                      <TextInput
                        style={styles.input}
                        value={values.newPassword}
                        onChangeText={handleChange('newPassword')}
                        placeholder="Yeni şifreniz"
                        secureTextEntry
                      />
                      {errors.newPassword && touched.newPassword && (
                        <Text style={styles.errorText}>{errors.newPassword}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tercih Edilen Türler</Text>
                    <Text style={styles.helperText}>En az bir tür seçmelisiniz</Text>
                    
                    <View style={styles.genresSelectionContainer}>
                      {allGenres.map((genre) => (
                        <TouchableOpacity
                          key={genre.genre_id}
                          style={[
                            styles.genreSelectItem,
                            {
                              backgroundColor: 
                                values.selectedGenres?.includes(Number(genre.genre_id))
                                  ? '#4F709C' 
                                  : '#E1F5FE'
                            }
                          ]}
                          onPress={() => {
                            // Mevcut seçili türleri kopyala, eğer boş ise boş dizi oluştur
                            const currentGenres = Array.isArray(values.selectedGenres) ? [...values.selectedGenres] : [];
                            
                            // Genre ID'sini number tipine çevir (API'ye number olarak gönderilmeli)
                            const genreId = Number(genre.genre_id);
                            const genreIndex = currentGenres.indexOf(genreId);
                            
                            if (genreIndex >= 0) {
                              // Tür zaten seçili ise kaldır
                              currentGenres.splice(genreIndex, 1);
                            } else {
                              // Tür seçili değilse ekle
                              currentGenres.push(genreId);
                            }
                            
                            setFieldValue('selectedGenres', currentGenres);
                          }}
                        >
                          <Text 
                            style={[
                              styles.genreSelectText, 
                              {
                                color: 
                                  values.selectedGenres?.includes(Number(genre.genre_id))
                                    ? '#FFF' 
                                    : '#4F709C'
                              }
                            ]}
                          >
                            {genre.genre_name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {errors.selectedGenres && (
                      <Text style={styles.errorText}>{errors.selectedGenres}</Text>
                    )}
                  </View>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity 
                      style={[styles.button, styles.cancelButton]} 
                      onPress={() => setIsEditing(false)}
                    >
                      <Text style={styles.cancelButtonText}>İptal</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.button, styles.saveButton]} 
                      onPress={handleSubmit}
                    >
                      <Text style={styles.saveButtonText}>Kaydet</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          )}

          {!isEditing && (
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <FontAwesome name="sign-out" size={20} color="#FFF" />
              <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingIndicator: {
    flex: 1,
    alignSelf: 'center',
  },
  backdropView: {
    height: 200,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  profileHeader: {
    position: 'absolute',
    bottom: -50,
    width: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4F709C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userInfoContainer: {
    marginTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  createdAt: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#4F709C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  preferencesContainer: {
    marginTop: 10,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#666',
  },
  preferenceValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  genreTag: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#4F709C',
    fontWeight: '500',
  },
  noGenresText: {
    color: '#888',
    fontStyle: 'italic',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  formContainer: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  readOnlyField: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#888',
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 12,
    color: '#FF5252',
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  genresSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  genreSelectItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreSelectText: {
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  saveButton: {
    backgroundColor: '#4F709C',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;