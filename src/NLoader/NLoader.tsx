import { Oval } from 'react-loader-spinner';
import { useLoader } from './NLoaderProvider';
import React from 'react';

interface NLoadingScreenProps {
  height?: number;
  width?: number;
  color?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  strokeWidthSecondary?: number;
  message?: string;
}

const NLoadingScreen: React.FC<NLoadingScreenProps> = ({
  height = 40,
  width = 40,
  color = '#FFFFFF',
  secondaryColor = '#666666',
  strokeWidth = 6,
  strokeWidthSecondary = 6,
  message = 'Loading',
}) => {
  const { isLoaderOpen } = useLoader();

  return (
    isLoaderOpen && (
      <div className="bg-black fixed inset-0 z-[999] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 rounded-[15px] bg-[#4D4D4D] p-8">
          <Oval
            height={height}
            width={width}
            color={color}
            secondaryColor={secondaryColor}
            strokeWidth={strokeWidth}
            strokeWidthSecondary={strokeWidthSecondary}
          />
          <span className="text-white text-sm font-light tracking-wide">{message}</span>
        </div>
      </div>
    )
  );
};

interface SuccessLoaderProps {
  message: string;
}

const NSuccessLoader: React.FC<SuccessLoaderProps> = ({ message }) => {
  return (
    <div className="flex h-2/6 w-2/6 flex-col items-center justify-center gap-2 rounded-[15px] bg-[#4D4D4D] p-8">
      <div className="bg-white flex h-12 w-12 items-center justify-center rounded-full">
        <img src="/check.svg" alt="Success" className="h-6 w-6" />
      </div>
      <span className="text-white text-sm font-light tracking-wide">{message}</span>
    </div>
  );
};

interface ErrorLoaderProps {
  message: string;
}

const NErrorLoader: React.FC<ErrorLoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[15px] bg-[#4D4D4D] p-8">
      <div className="bg-white flex h-12 w-12 items-center justify-center rounded-full">
        <img src="/cross.svg" alt="Error" className="h-6 w-6" />
      </div>
      <span className="text-white text-sm font-light tracking-wide">{message}</span>
    </div>
  );
};

interface WarningLoaderProps {
  message: string;
}

const NWarningLoader: React.FC<WarningLoaderProps> = ({ message }) => {
  return (
    <div className="bg-yellow-600 flex h-2/6 w-2/6 flex-col items-center justify-center gap-2 rounded-[15px] p-8">
      <span className="text-white text-sm font-light tracking-wide">{message}</span>
    </div>
  );
};

export { NLoadingScreen, NSuccessLoader, NErrorLoader, NWarningLoader };
