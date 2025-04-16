import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { router, Link } from 'expo-router';
import { Formik } from 'formik';
import { useAuth } from '../context/AuthContext';
import RegisterSchema from '../components/authSchema';
import { MaterialIcons } from '@expo/vector-icons';
import CustomDropdown from '../components/CustomDropdown';
import styles from './authStyle';

const Register = () => {
  const [country, setCountry] = useState([]);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { register } = useAuth();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/getCountry`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async ({ username, email, password, country }, setStatus) => {
    const result = await register(username, email, password, country);
    
    if (result && !result.error) {
      router.replace('/');
    } else {
      setStatus(result.msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.logoContainer}>
          {/* app logosu ile değiştir */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>APP</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Hesap Oluştur</Text>
          <Text style={styles.subtitle}>Hemen kayıt olun ve başlayın</Text>

          <Formik
            initialValues={{ username: '', email: '', password: '', country: '' }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { setStatus }) => {
              handleSubmit(values, setStatus);
            }}
          >
            {({
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              status
            }) => (
              <View style={styles.formInner}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
                  <View style={[
                    styles.inputWrapper,
                    touched.username && errors.username ? styles.inputError : null
                  ]}>
                    <MaterialIcons name="person" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      inputMode="text"
                      autoComplete="username"
                      maxLength={20}
                      multiline={false}
                      placeholder="Kullanıcı Adı"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                  </View>
                  {errors.username && touched.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>E-Mail</Text>
                  <View style={[
                    styles.inputWrapper,
                    touched.email && errors.email ? styles.inputError : null
                  ]}>
                    <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      keyboardType="email-address"
                      inputMode="email"
                      autoComplete="email"
                      maxLength={50}
                      multiline={false}
                      placeholder="örnek@gmail.com"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Şifre</Text>
                  <View style={[
                    styles.inputWrapper,
                    touched.password && errors.password ? styles.inputError : null
                  ]}>
                    <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      secureTextEntry={secureTextEntry}
                      maxLength={20}
                      multiline={false}
                      placeholder="******"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity 
                      style={styles.eyeIcon} 
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    >
                      <MaterialIcons 
                        name={secureTextEntry ? "visibility" : "visibility-off"} 
                        size={20} 
                        color="#666" 
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Ülke</Text>
                  <CustomDropdown
                    data={country || []}
                    value={values.country}
                    onChange={(val) => setFieldValue('country', val)}
                    placeholder="Ülke seçin"
                    searchPlaceholder="Ülke ara"
                    onBlur={() => handleBlur('country')}
                    hasError={touched.country && errors.country}
                    name="country"
                  />
                  {errors.country && touched.country && (
                    <Text style={styles.errorText}>{errors.country}</Text>
                  )}
                </View>

                {status && <Text style={styles.statusError}>{status}</Text>}

                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                  <Text style={styles.registerButtonText}>Kayıt Ol</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Hesabın Var Mı? {' '}
                    <Link href="/auth/Login" style={styles.linkText}>
                      Giriş Yap
                    </Link>
                  </Text>
                </View>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>VEYA</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Google ile Kayıt Ol</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;