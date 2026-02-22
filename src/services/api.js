// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://orders-backend.pxxl.click/api',
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

// ===== دالة معالجة الصور =====
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=No+Image';
  }

  console.log('Original image path:', imageUrl);

  // الحالة 1: إذا كان المسار من النوع E:/js dev/...
  if (imageUrl.startsWith('E:')) {
    const filename = imageUrl.split('\\').pop().split('/').pop();
    console.log('Extracted filename:', filename);
    return `https://orders-backend.pxxl.click/uploads/${filename}`;
  }

  // الحالة 2: إذا كان المسار يبدأ بـ /uploads
  if (imageUrl.startsWith('/uploads')) {
    const filename = imageUrl.split('/').pop();
    return `https://orders-backend.pxxl.click/uploads/${filename}`;
  }

  // الحالة 3: إذا كان رابط كامل (http)
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // الحالة 4: إذا كان اسم ملف فقط
  return `https://orders-backend.pxxl.click/uploads/${imageUrl}`;
};

// ===== ORDER ENDPOINTS =====
export const orderAPI = {
  getAll: (params) => API.get('/orders', { params }),
  getOne: (id) => API.get(`/orders/${id}`),
  getMyOrders: () => API.get('/orders/myorders'),
  create: (orderData) => API.post('/orders', orderData),
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),
  cancel: (id) => API.put(`/orders/${id}/cancel`),
  pay: (id, paymentMethod) => API.post(`/orders/${id}/pay`, { paymentMethod }),
  getStats: () => API.get('/orders/stats'),
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

// ===== AUTH ENDPOINTS =====
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

// ===== USER ENDPOINTS =====
export const userAPI = {
  getAll: (params) => API.get('/users', { params }),
  getOne: (id) => API.get(`/users/${id}`),
  updateRole: (id, data) => API.put(`/users/${id}/role`, data),
  delete: (id) => API.delete(`/users/${id}`),
  getStats: () => API.get('/users/stats'),
};

// ===== PAYMENT ENDPOINTS =====
export const paymentAPI = {
  createIntent: (orderId) => API.post('/payments/stripe/create-intent', { orderId }),
  refund: (orderId) => API.put(`/payments/refund/${orderId}`),
};

export default API;