import React, { useState } from 'react';
import classNames from 'classnames';

export type NSwitchProps = {
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
};

const NSwitch: React.FC<NSwitchProps> = ({
  defaultChecked = false,
  onChange,
  activeColor = 'bg-main',
  inactiveColor = 'bg-[#FFFFFF1A]',
  className,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    setChecked(!checked);
    onChange?.(!checked);
  };

  const style = checked ? { transform: 'translateX(22px)' } : { transform: 'translateX(2px)' };

  return (
    <div
      role="button"
      className={classNames(
        'relative inline-block h-[30px] w-[50px] cursor-pointer overflow-hidden rounded-[50px]',
        checked ? activeColor : inactiveColor,
        className,
      )}
      onClick={handleClick}
    >
      <div
        className="absolute top-[2px] h-[26px] w-[26px] rounded-full bg-[white] transition-all"
        style={{ boxShadow: '0px 3px 8px 0px #00000026', ...style }}
      />
    </div>
  );
};

export default NSwitch;
