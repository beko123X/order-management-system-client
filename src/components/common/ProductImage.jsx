// src/components/common/ProductImage.jsx
import React, { useState } from 'react';
import { getImageUrl } from '../../services/api';

const ProductImage = ({ src, alt, className, fallbackSrc }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src));
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else {
        // صورة افتراضية عند فشل التحميل
        setImgSrc('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'16\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E');
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ProductImage;