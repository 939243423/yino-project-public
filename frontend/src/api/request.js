import axios from 'axios';
import { dialog } from '../utils/ui';

const request = axios.create({
  baseURL: '/api',
  timeout: 30000 // Increased timeout for translation/large uploads
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
}, async error => {
  if (error.response) {
    const status = error.response.status;
    
    if (status === 401) {
      // Clear credentials
      localStorage.removeItem('yino_admin_token');
      localStorage.removeItem('yino_admin_user');
      
      // If we are already on login page, don't show alert again
      if (!window.location.hash.includes('/admin/login') && !window.location.pathname.includes('/admin/login')) {
        await dialog.alert('登录过期', '您的登录状态已失效，请重新登录。', { confirmText: '重新登录' });
        window.location.href = '#/admin/login';
      }
    } else if (status === 413 || (status === 500 && error.response.data?.message?.includes('File too large'))) {
      // Handle both 413 and 500 "File too large"
      error.message = '文件过大请压缩再上传';
    }
  }
  return Promise.reject(error);
});

export default request;
