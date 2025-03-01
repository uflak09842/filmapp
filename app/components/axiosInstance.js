import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);
        
        if (!refreshToken) {
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_AUTH_SERVER_URL}/token`, 
          { refreshToken }
        );
        
        const { accessToken } = response.data;
        
        await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY, accessToken);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY);
        await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);

        router.replace('/');
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;