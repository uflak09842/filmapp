import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { router, Link } from 'expo-router';
import { Formik } from 'formik';

import { useAuth } from '../context/AuthContext.jsx';
import { LoginSchema } from '../components/authSchema.js';

import styles from './authStyle.js';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { login } = useAuth();

  const handleSubmit = async ({ email, password }, setStatus) => {
    const result = await login(email, password);

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
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
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
              <Text style={styles.title}>Giriş Yap</Text>

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

              {status && <Text style={styles.errorText}>{status}</Text>}

              <View style={styles.button}>
                <Button title='Giriş Yap' onPress={handleSubmit} />
              </View>
            
            </View>
          )}
        </Formik>
        <View style={styles.footerView}>
          <Text>Hesabın Yok Mu ? <Link style={styles.linkText} href={'/auth/Register'}>Kayıt ol</Link></Text>
        </View>
        
      </View>

    </View>
  );
}

export default Login