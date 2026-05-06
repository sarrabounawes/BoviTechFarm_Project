import axios from 'axios';
import { APP_DEFAULT_BASE_URL } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cowApi = axios.create({
  baseURL: `${APP_DEFAULT_BASE_URL}/api`,
});

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCows = async () => {
  const config = await getAuthHeader();

  const response = await cowApi.get('/cows/', config);

  return response.data.data;
};

export const createCow = async (cowData) => {
  const config = await getAuthHeader();

  return cowApi.post('/cows/', cowData, {
    ...config,
    headers: {
      ...config.headers    },
  });
};

export const deleteCow = async (id) => {
  const config = await getAuthHeader();
  await cowApi.delete(`/cows/${id}/`, config);
};

export const updateCow = async (id, formData) => {
  const config = await getAuthHeader();
  const response = await cowApi.put(`/cows/${id}/`, formData, {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};