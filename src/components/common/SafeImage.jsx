// src/components/common/SafeImage.jsx
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../services/api';

const SafeImage = ({ src, alt, className, fallback = '/placeholder-image.jpg' }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setImgSrc('/placeholder-image.jpg');
      setLoading(false);
      return;
    }

    const fixedUrl = getImageUrl(src);
    console.log('🖼️ Loading image:', fixedUrl);
    setImgSrc(fixedUrl);
    setLoading(false);
  }, [src]);

  const handleError = () => {
    if (!error) {
      console.warn('❌ Failed to load image:', imgSrc);
      setError(true);
      setImgSrc('https://via.placeholder.com/300x200?text=Image+Not+Found');
    }
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
      alt={alt || 'Product image'}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default SafeImage;