import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';

export type NCheckboxProps = {
  options: { key: string; label: ReactNode }[];
  defaultCheckedKey: string;
  onChange?(key: string): void;
  uncheckedIcon?: ReactNode;
  checkedIcon?: ReactNode;
  containerClassName?: string;
};

const NCheckbox: React.FC<NCheckboxProps> = ({
  defaultCheckedKey,
  options,
  onChange,
  uncheckedIcon = DefaultUncheckedIcon,
  checkedIcon = DefaultCheckedIcon,
  containerClassName,
}) => {
  const [selected, setSelected] = useState(defaultCheckedKey);

  const handleSelect = (key: string) => {
    setSelected(key);
    onChange?.(key);
  };

  return (
    <div className={classNames('flex items-center', containerClassName)}>
      {options.map((option, idx) => (
        <div
          key={option.key}
          className={classNames('flex items-center', idx > 0 && 'ml-[20px]')}
          onClick={() => handleSelect(option.key)}
        >
          {selected === option.key ? checkedIcon : uncheckedIcon}
          <span className="ml-[6px]">{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NCheckbox;

const DefaultUncheckedIcon: ReactNode = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="#464646" strokeWidth="2" />
  </svg>
);

const DefaultCheckedIcon: ReactNode = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill="#33EE94"
    />
    <path
      d="M16.78 6.90214C17.2484 7.19485 17.3907 7.8118 17.098 8.28013L11.473 17.2801C11.3022 17.5534 11.0102 17.7276 10.6886 17.7481C10.3669 17.7686 10.0551 17.6328 9.85107 17.3834L6.47607 13.2584C6.12635 12.8309 6.18935 12.2009 6.61679 11.8512C7.04424 11.5014 7.67426 11.5645 8.02399 11.9919L10.516 15.0377L15.402 7.22013C15.6947 6.7518 16.3117 6.60943 16.78 6.90214Z"
      fill="white"
    />
  </svg>
);
