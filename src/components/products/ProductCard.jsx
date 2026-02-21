// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProductImage from '../common/ProductImage';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault(); // منع التنقل إلى صفحة التفاصيل
    e.stopPropagation();
    
    if (!isAuthenticated) {
      window.location.href = '/#/login';
      return;
    }
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl || product.image,
      stock: product.stock
    }, 1);
    
    alert(`✅ Added ${product.name} to cart`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <Link to={`/products/${product._id}`}>
        <div className="relative h-48 overflow-hidden">
          <ProductImage
            src={product.imageUrl || product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description || 'No description available'}
          </p>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${
              product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.stock === 0 ? 'Out of Stock' : 'Add'}
          </button>
        </div>
        {product.stock > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {product.stock} available
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;