import React from 'react';

interface NCommonHeaderProps {
  leftIcon?: React.ReactNode | null;
  onBack: () => void;
  center: React.ReactNode | string | null;
  right?: React.ReactNode | null;
}

const NCommonHeader: React.FC<NCommonHeaderProps> = ({ leftIcon, onBack, center, right }) => {
  return (
    <div className="relative flex h-[48px] w-full items-center justify-center px-4">
      <button
        className="absolute flex h-full w-[80px] cursor-pointer items-center"
        style={{ left: '2px' }}
        onClick={onBack}
      >
        {leftIcon}
      </button>

      <div className="flex-grow text-center flex items-center  justify-center">
        {typeof center === 'string' ? <div>{center}</div> : center}
      </div>

      {right && (
        <div
          className="absolute right-0 mt-[4px] h-[48px] w-[60px] cursor-pointer text-center"
          style={{ lineHeight: '48px' }}
        >
          {right}
        </div>
      )}
    </div>
  );
};

export default NCommonHeader;
