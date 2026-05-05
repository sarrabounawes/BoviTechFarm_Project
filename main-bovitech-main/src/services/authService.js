import axios from 'axios';
import { API_BASE_URL, APP_DEFAULT_BASE_URL } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = axios.create({
  baseURL: `${APP_DEFAULT_BASE_URL}/api/auth`,
});

export const login = async (email, password) => {
  const response = await authApi.post('/login/', { email, password });
  const { token, refresh } = response.data.data;
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('refresh', refresh);
  return response.data;
};

export const getProfile = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await authApi.get('/me/', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};

export const register = async (username, email, password, farmName, cowCount, region) => {
  const response = await authApi.post('/register/', { 
    username, 
    email, 
    password,
    farm_name: farmName,
    cow_count: cowCount,
    region 
  });
  return response.data;
};

export const logout = async () => {
  const refresh = await AsyncStorage.getItem('refresh');
  const token = await AsyncStorage.getItem('token');
//   console.log('token:', token);
//   console.log('refresh:', refresh);
  await authApi.post('/logout/', { refresh }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refresh');
};