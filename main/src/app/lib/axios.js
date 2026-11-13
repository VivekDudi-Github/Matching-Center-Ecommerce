// lib/axios.ts
import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});


api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status

    if (status === 400) {
      toast.error(
        error.response?.data?.message || 'Something went wrong'
      )
    } else if (status === 401) {
      toast.error('Unauthorized request')
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action')
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out')
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.')
    }

    // keep it to have tanstack not caching failed responses
    return Promise.reject(error);
  }
);
