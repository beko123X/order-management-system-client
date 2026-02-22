// src/components/common/ProductImage.jsx
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../services/api';

const ProductImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState('https://via.placeholder.com/300x200/3b82f6/ffffff?text=Loading...');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src) {
      const fixedUrl = getImageUrl(src);
      console.log('🖼️ Loading image:', fixedUrl);
      setImgSrc(fixedUrl);
    }
  }, [src]);

  const handleError = () => {
    if (!error) {
      console.log('❌ Image failed, using placeholder');
      setError(true);
      setImgSrc('https://via.placeholder.com/300x200/3b82f6/ffffff?text=No+Image');
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Product'}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ProductImage;