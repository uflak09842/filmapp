import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, Image, ScrollView } from 'react-native';
import { router, Link } from 'expo-router';
import { Formik } from 'formik';
import { useAuth } from '../context/AuthContext.jsx';
import { LoginSchema } from '../components/authSchema.js';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './authStyle.js';

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login } = useAuth();

  const handleSubmit = async ({ email, password }, setStatus) => {
    const result = await login(email, password);
    if (result && !result.error) {
      router.replace('/');
    } else {
      setStatus(result.msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>APP</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Hoş Geldiniz</Text>
          <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
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

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.linkText}>Şifremi Unuttum</Text>
                </TouchableOpacity>

                {status && <Text style={styles.statusError}>{status}</Text>}

                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                  <Text style={styles.registerButtonText}>Giriş Yap</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>VEYA</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Google ile Giriş Yap</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Hesabın Yok Mu ? {' '} 
            <Link href="/auth/Register" style={styles.linkText}>
              Kayıt Ol
            </Link>
          </Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Login