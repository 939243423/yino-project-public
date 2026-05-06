import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
});

request.interceptors.request.use(config => {
  const token = localStorage.getItem('yino_admin_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

request.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (error.response) {
    if (error.response.status === 401) {
      localStorage.removeItem('yino_admin_token');
    } else if (error.response.status === 413 || (error.response.status === 500 && error.response.data?.message?.includes('File too large'))) {
      // Handle both 413 and 500 "File too large"
      error.message = '文件过大请压缩再上传';
    }
  }
  return Promise.reject(error);
});

export default request;
