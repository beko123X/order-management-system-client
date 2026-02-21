import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const { data } = await authAPI.register(userData);
      
      // تأكد من أن البيانات تحتوي على token و user
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // تخزين بيانات المستخدم (قد تكون في data.user أو data نفسها)
      const userDataToStore = data.user || data;
      localStorage.setItem('user', JSON.stringify(userDataToStore));
      setUser(userDataToStore);
      
      return { success: true, data: userDataToStore };
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
      return { 
        success: false, 
        error: err.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const login = async (credentials) => {
  try {
    setError(null);
    console.log('Attempting login with:', credentials.email);
    
    const { data } = await authAPI.login(credentials);
    console.log('Login response:', data);
    
    // حفظ التوكن
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    // حفظ بيانات المستخدم - تأكد من أن role صحيح
    const userData = data.user || data;
    
    // تأكد من أن role ليس به علامات اقتباس زائدة
    if (userData.role && typeof userData.role === 'string') {
      // إزالة أي علامات اقتباس زائدة
      userData.role = userData.role.replace(/["']/g, '');
    }
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    return { success: true, data: userData };
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    
    // تحسين عرض الخطأ
    const errorMessage = err.response?.data?.message || err.message || 'Login failed';
    setError(errorMessage);
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  // التحقق من صلاحيات المستخدم
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    
    if (user.role === 'manager') {
      const managerPermissions = [
        'ORDER_VIEW_ALL', 
        'ORDER_UPDATE_STATUS', 
        'PRODUCT_VIEW',
        'PRODUCT_EDIT',
        'USER_VIEW'
      ];
      return managerPermissions.includes(permission);
    }
    
    if (user.role === 'user') {
      const userPermissions = [
        'PRODUCT_VIEW',
        'ORDER_VIEW_OWN',
        'ORDER_CREATE'
      ];
      return userPermissions.includes(permission);
    }
    
    return false;
  };

  // قيمة الـ context
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isUser: user?.role === 'user',
    userRole: user?.role || null,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};