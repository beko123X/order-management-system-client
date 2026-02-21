// src/components/common/ProductImage.jsx
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../services/api';

const ProductImage = ({ src, alt, className, onClick }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setImgSrc(null);
      setLoading(false);
      return;
    }

    const fixedUrl = getImageUrl(src);
    console.log('🖼️ Loading image:', fixedUrl);
    setImgSrc(fixedUrl);
    setLoading(false);
  }, [src]);

  const handleError = () => {
    console.error('❌ Failed to load image:', imgSrc);
    setError(true);
    setImgSrc('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'500\' height=\'500\' viewBox=\'0 0 500 500\'%3E%3Crect width=\'500\' height=\'500\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'20\' fill=\'%239ca3af\'%3ENo Image Available%3C/text%3E%3C/svg%3E');
  };

  if (loading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'500\' height=\'500\' viewBox=\'0 0 500 500\'%3E%3Crect width=\'500\' height=\'500\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'20\' fill=\'%239ca3af\'%3ENo Image Available%3C/text%3E%3C/svg%3E'}
      alt={alt || 'Product image'}
      className={className}
      onError={handleError}
      onClick={onClick}
      loading="lazy"
    />
  );
};

export default ProductImage;