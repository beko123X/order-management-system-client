import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://orders-backend.pxxl.click/api';
const IMAGE_BASE_URL = 'https://orders-backend.pxxl.click';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// في src/services/api.js - أضف/حدث هذه الدالة
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  
  // إذا كان الرابط من Cloudinary، استخدمه مباشرة
  if (imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }
  
  // إذا كان رابطاً كاملاً، استخدمه
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // إذا كان رابطاً محلياً، حوله لرابط الخادم
  return `https://orders-backend.pxxl.click${imageUrl}`;
};



// Interceptor لمعالجة Responses
API.interceptors.response.use(
  (response) => {
    // معالجة URLs في الـ response data
    if (response.data && typeof response.data === 'object') {
      const processUrls = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;
        
        Object.keys(obj).forEach(key => {
          // إذا كان المفتاح image أو images أو صورة
          if (key.toLowerCase().includes('image') || key.toLowerCase().includes('img')) {
            if (typeof obj[key] === 'string') {
              obj[key] = getImageUrl(obj[key]);
            }
          }
          // إذا كان مصفوفة صور
          else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map(item => {
              if (typeof item === 'string' && item.includes('localhost')) {
                return getImageUrl(item);
              }
              return item;
            });
          }
          // recursion للكائنات الداخلية
          else if (obj[key] && typeof obj[key] === 'object') {
            obj[key] = processUrls(obj[key]);
          }
        });
        return obj;
      };
      
      response.data = processUrls(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== AUTH ENDPOINTS =====
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

// ===== PRODUCT ENDPOINTS =====
export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getOne: (id) => API.get(`/products/${id}`),
  create: (formData) => API.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => API.delete(`/products/${id}`),
};

// ===== ORDER ENDPOINTS =====
export const orderAPI = {
  create: (orderData) => API.post('/orders', orderData),
  getMyOrders: () => API.get('/orders/myorders'),
  getAll: (params) => API.get('/orders', { params }),
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),
  cancel: (id) => API.put(`/orders/${id}/cancel`),
  pay: (id, paymentMethod) => API.post(`/orders/${id}/pay`, { paymentMethod }),
};

// ===== PAYMENT ENDPOINTS =====
export const paymentAPI = {
  createIntent: (orderId) => API.post('/payments/stripe/create-intent', { orderId }),
  refund: (orderId) => API.put(`/payments/refund/${orderId}`),
};

// ===== USER ENDPOINTS =====
export const userAPI = {
  getAll: (params) => API.get('/users', { params }),
  getOne: (id) => API.get(`/users/${id}`),
  updateRole: (id, data) => API.put(`/users/${id}/role`, data),
  delete: (id) => API.delete(`/users/${id}`),
  getStats: () => API.get('/users/stats'),
};

export default API;