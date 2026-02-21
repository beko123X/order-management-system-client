import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../layout/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    // حفظ المسار الحالي لإعادة التوجيه بعد تسجيل الدخول
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">غير مصرح</h1>
          <p className="text-gray-600 mb-4">ليس لديك صلاحية الوصول إلى هذه الصفحة</p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;