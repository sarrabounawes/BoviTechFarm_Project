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

  const response = await cowApi.post('/cows/', cowData, config);

  return response.data.data;
};

export const getCowById = async (id) => {
  const config = await getAuthHeader();

  const response = await cowApi.get(`/cows/${id}/`, config);

  return response.data.data;
};

export const updateCow = async (id, data) => {
  const config = await getAuthHeader();

  const response = await cowApi.put(`/cows/${id}/`, data, config);

  return response.data.data;
};

export const deleteCow = async (id) => {
  const config = await getAuthHeader();

  const response = await cowApi.delete(`/cows/${id}/`, config);

  return response.data;
};