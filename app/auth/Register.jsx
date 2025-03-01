import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Redirect, router, Link } from 'expo-router';
import { Formik } from 'formik'

import { useAuth } from '../context/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list';
import RegisterSchema from '../components/authSchema';

import styles from './authStyle';

const Register = () => {
  const [ country, setCountry ] = useState('');
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

  const handleSubmit = async ({username, email, password, country}, setStatus) => {

    const result = await register(username, email, password, country);

    if(result && !result.error) {
      router.replace('/');
    } else {
      setStatus(result.msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Formik
          initialValues={{username: '', email: '', password: '', country: ''}}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setStatus }) => {
            handleSubmit(values, setStatus)
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

            <View>
              <Text style={styles.title}>Kayıt Ol</Text>

              <View style={styles.lieView}>
                <Text style={styles.text}>Kullanıcı Adı</Text>
                <TextInput 
                  style={styles.input}
                  inputMode='text'
                  autoComplete='username'
                  maxLength={20}
                  multiline={false}

                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />

                {errors.username && touched.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>

              <View style={styles.lieView}>
                <Text style={styles.text}>E-Mail</Text>
                <TextInput 
                  style={styles.input}
                  keyboardType='email-address'
                  inputMode='email'
                  autoComplete='email'
                  maxLength={50}
                  multiline={false}
                  placeholder='örnek@gmail.com'
                  placeholderTextColor={"gray"}

                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.lieView}>
                <Text style={styles.text}>Şifre</Text>
                <TextInput 
                  style={styles.input}
                  keyboardType='visible-password'
                  inputMode='password'
                  maxLength={20}
                  multiline={false}
                  placeholder='******'
                  placeholderTextColor={"gray"}

                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              </View>

              <View style={styles.lieView}>
                <Text style={styles.text}>Ülke</Text>
                <SelectList
                  boxStyles={styles.selectBox}
                  dropdownStyles={styles.selectDrop}
                  inputStyles={styles.selectInput}
                  style={styles.selectList} 
                  placeholder='Seç'
                  searchPlaceholder='Ara'
                  notFoundText='Bulunamadı.'
                  searchicon={<Text> </Text>}

                  data={country}
                  value={values.country}
                  save='key'
                  setSelected={(val) => setFieldValue('country', val)}
                  onBlur={handleBlur('email')}
                />

                {errors.country && touched.country && (
                  <Text style={styles.errorText}>{errors.country}</Text>
                )}
              </View>

              {status && <Text style={styles.errorText}>{status}</Text>}

              <View style={styles.button}>
                <Button title='Kayıt Ol' onPress={handleSubmit} />
              </View>
            
            </View>
          )}
        </Formik>

        <View style={styles.footerView}>
          <Text>Hesabın Var Mı ? <Link style={styles.linkText} href={'/auth/Login'}>Giriş Yap</Link></Text>
        </View>
        
      </View>

    </View>
  );
}

export default Register