// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../common/ProductImage';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id || product._id}`}>
        <div className="relative h-48 overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-indigo-600">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500">
              {product.stock} in stock
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;