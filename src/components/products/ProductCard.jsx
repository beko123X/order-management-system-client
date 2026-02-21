// src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProductImage from '../common/ProductImage';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // منع التنقل إلى صفحة التفاصيل
    e.stopPropagation();
    
    if (!isAuthenticated) {
      window.location.href = '/#/login';
      return;
    }
    
    setAdding(true);
    
    // إضافة المنتج إلى السلة
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl || product.image || product.images?.[0],
      stock: product.stock
    }, 1);
    
    // إظهار رسالة نجاح
    alert(`✅ تمت إضافة ${product.name} إلى السلة`);
    
    setTimeout(() => setAdding(false), 500);
  };

  // التحقق من وجود المنتج والصور
  const productImage = product.imageUrl || product.image || product.images?.[0];
  const productName = product.name || 'منتج';
  const productPrice = product.price || 0;
  const productStock = product.stock || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* رابط لصفحة التفاصيل (على الصورة فقط) */}
      <Link to={`/products/${product._id}`} className="block relative h-48 overflow-hidden bg-gray-100">
        <ProductImage
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay with view details */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={30} />
        </div>
      </Link>

      {/* محتوى المنتج */}
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition line-clamp-1">
            {productName}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description || 'لا يوجد وصف للمنتج'}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-blue-600">
              ${productPrice}
            </span>
            {productStock > 0 && (
              <span className="text-xs text-gray-500 block">
                {productStock} متوفر
              </span>
            )}
          </div>
          
          {/* زر الإضافة إلى السلة - يظهر دائماً */}
          <button
            onClick={handleAddToCart}
            disabled={productStock === 0 || adding}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              productStock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : adding
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
            }`}
          >
            <ShoppingCart className={`h-4 w-4 mr-1 ${adding ? 'animate-bounce' : ''}`} />
            {productStock === 0 ? 'غير متوفر' : adding ? 'جاري...' : 'إضافة'}
          </button>
        </div>

        {/* شارة الكمية المحدودة */}
        {productStock > 0 && productStock < 5 && (
          <p className="text-xs text-orange-500 mt-2">
            ⚠️ كمية محدودة!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;