// src/components/common/ProductImage.jsx
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../services/api';

const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'16\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E';

const ProductImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(DEFAULT_IMAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (src) {
      const fixedUrl = getImageUrl(src);
      console.log('🖼️ Loading image:', fixedUrl);
      setImgSrc(fixedUrl);
    }
    setLoading(false);
  }, [src]);

  const handleError = () => {
    console.log('❌ Using default image');
    setImgSrc(DEFAULT_IMAGE);
  };

  if (loading) {
    return <div className={`${className} bg-gray-200 animate-pulse`} />;
  }

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