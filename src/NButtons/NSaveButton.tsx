import React from 'react';
import classNames from 'classnames';

// Define the HapticFeedback type without importing from SDK
type ImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
type HapticFeedback = {
  impactOccurred: (style: ImpactStyle) => void;
};

type NSaveButtonProps = {
  onClick: () => void;
  label?: string;
  color?: string;
  relative?: boolean;
  height?: string;
  width?: string;
  children?: React.ReactNode;
  hapticFeedback?: HapticFeedback;
  vibrateFn: (hapticFeedback?: HapticFeedback) => void;
};

const NSaveButton: React.FC<NSaveButtonProps> = ({
  onClick,
  label = 'Save',
  color = 'text-main',
  relative = false,
  height = '48px',
  width = '60px',
  children,
  hapticFeedback,
  vibrateFn,
}) => {
  return (
    <button
      onClick={() => {
        if (color === 'text-main') {
          vibrateFn(hapticFeedback);
        }
        onClick?.();
      }}
      className={classNames(
        relative ? '' : 'absolute right-0',
        `w-[${width}] cursor-pointer text-center`,
        color,
        height === 'auto' ? '' : `h-[${height}]`,
      )}
      style={{ lineHeight: height === 'auto' ? '' : height }}
    >
      {children || label}
    </button>
  );
};

export default NSaveButton;
