import React, { useState, useEffect } from 'react';

// صور Placeholder مختلفة الأحجام
const PLACEHOLDERS = {
  small: 'https://via.placeholder.com/150x150?text=Product',
  medium: 'https://via.placeholder.com/300x200?text=Product+Image',
  large: 'https://via.placeholder.com/500x500?text=Product',
  default: 'https://via.placeholder.com/300x200?text=No+Image'
};

const ProductImage = ({ src, alt, className, onClick }) => {
  const [imgSrc, setImgSrc] = useState(PLACEHOLDERS.default);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setImgSrc(PLACEHOLDERS.default);
      setLoading(false);
      return;
    }

    // محاولة تحميل الصورة من الخادم
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    console.log('⚠️ Using placeholder for image');
    // اختيار placeholder مناسب حسب حجم الصورة
    if (className?.includes('h-96')) {
      setImgSrc(PLACEHOLDERS.large);
    } else if (className?.includes('h-48')) {
      setImgSrc(PLACEHOLDERS.medium);
    } else {
      setImgSrc(PLACEHOLDERS.small);
    }
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (loading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <span className="text-gray-400">جاري التحميل...</span>
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