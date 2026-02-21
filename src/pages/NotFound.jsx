import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mt-2">
          عذراً، الصفحة التي تبحث عنها غير متوفرة
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;