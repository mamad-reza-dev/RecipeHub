import { useState } from 'react';

export function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  width = 'w-48',
  aspect = 'aspect-square',
  placeholderColor = 'bg-primary',
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`${width} ${aspect} relative overflow-hidden rounded-lg ${className}`}
    >
      {!imageLoaded && (
        <div
          className={`absolute inset-0 ${placeholderColor} animate-pulse`}
        ></div>
      )}
      <img
        src={src}
        alt={alt}
        loading='lazy'
        className={`h-full w-full rounded-lg object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} `}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
