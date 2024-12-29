import React, { useState } from 'react';

interface NAvatarProps {
  src: string;
  defaultAvatar: string;
  alt?: string;
  onClick?: () => void;
  className?: string;
}

const NAvatar: React.FC<NAvatarProps> = ({ src, defaultAvatar, alt = 'Avatar', onClick, className }) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  const handleError = () => {
    setIsImgError(true);
  };

  return isImgError ? (
    <img src={defaultAvatar} alt={alt} onError={handleError} onClick={onClick} className={className} />
  ) : (
    <img src={src} alt={alt} onError={handleError} onClick={onClick} className={className} />
  );
};

export default NAvatar;
