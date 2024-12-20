'use client';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

// Define the bitwise enumeration for button states
export enum ButtonState {
  None = 0, // 000
  Small = 1 << 0, // 001
  Disabled = 1 << 1, // 010
  Main = 1 << 2, // 100
  Primary = 1 << 3, // 1000
  Secondary = 1 << 4, // 10000
  White = 1 << 5, // 100000
  Black = 1 << 6, // 1000000
}

interface NButtonsProps {
  state?: ButtonState;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const NButtons: React.FC<NButtonsProps> = ({
  state = ButtonState.None, // Default to 'None'
  onClick,
  children,
  className = '',
}: NButtonsProps) => {
  // Base button styles
  const baseClasses =
    'flex shrink-0 cursor-pointer items-center justify-center px-[20px] py-[10px] text-center text-base font-semibold';

  // Size class based on 'small' state
  const sizeClasses = state & ButtonState.Small ? 'rounded-full bg-[#C379FC1A] !text-xs' : 'h-[50px] rounded-[16px]';

  const typeClasses = getStyle(state);
  const disableClasses = state & ButtonState.Disabled ? 'opacity-65 cursor-not-allowed' : '';

  return (
    <div
      className={classNames(baseClasses, sizeClasses, typeClasses, disableClasses, className)}
      onClick={state & ButtonState.Disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};

function getStyle(state: ButtonState) {
  if (state & ButtonState.Primary) {
    return 'text-[black] bg-main';
  }
  if (state & ButtonState.Secondary) {
    return 'text-[black] bg-main-dark';
  }

  if (state & ButtonState.White) {
    return 'text-[black] bg-[white]';
  }

  if (state & ButtonState.Black) {
    return 'text-[white] bg-black-1';
  }

  if (state & ButtonState.Main) {
    return 'text-[white] bg-main-light';
  }

  return 'text-main bg-black-2';
}

export default NButtons;
