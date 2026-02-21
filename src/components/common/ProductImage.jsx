// src/components/common/ProductImage.jsx
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../services/api';

const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'16\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E';

const ProductImage = ({ src, alt, className, onClick }) => {
  const [imgSrc, setImgSrc] = useState(DEFAULT_IMAGE);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setImgSrc(DEFAULT_IMAGE);
      setLoading(false);
      return;
    }

    const fixedUrl = getImageUrl(src);
    console.log('🖼️ ProductImage loading:', fixedUrl);
    setImgSrc(fixedUrl);
    setLoading(false);
  }, [src]);

  const handleError = () => {
    console.error('❌ ProductImage failed:', imgSrc);
    setError(true);
    setImgSrc(DEFAULT_IMAGE);
  };

  const handleLoad = () => {
    console.log('✅ ProductImage loaded:', imgSrc);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || 'Product'}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      onClick={onClick}
      loading="lazy"
    />
  );
};

export default ProductImage;