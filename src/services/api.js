import axios from 'axios';

// استخدم import.meta.env بدلاً من process.env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://orders-backend.pxxl.click/api',
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


// إضافة هذه الدالة في api.js
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'16\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E';
  }

  // إذا كان المسار كامل (يبدأ بـ http)
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  const baseURL = import.meta.env.VITE_BASE_URL || 'https://orders-backend.pxxl.click';

  // تنظيف المسار
  let cleanPath = imagePath;
  
  // إزالة /uploads إذا كان موجوداً في البداية
  if (cleanPath.startsWith('/uploads')) {
    cleanPath = cleanPath;
  } else if (cleanPath.startsWith('uploads/')) {
    cleanPath = `/${cleanPath}`;
  } else {
    cleanPath = `/uploads/${cleanPath}`;
  }

  // إزالة أي تكرار في /uploads
  cleanPath = cleanPath.replace(/\/+/g, '/');
  
  const fullUrl = `${baseURL}${cleanPath}`;
  console.log('🖼️ Generated image URL:', fullUrl);
  
  return fullUrl;
};

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