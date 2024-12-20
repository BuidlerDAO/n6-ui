import React from 'react';
import classNames from 'classnames';

interface NChipProps {
  searchTerm: string;
  onDelete: () => void;
  onClick: () => void;
  chipClassName?: string;
  btnClassName?: string;
  closeClassName?: string;
  closeIcon?: JSX.Element;
}

const NChip: React.FC<NChipProps> = ({
  searchTerm,
  onDelete,
  onClick,
  chipClassName = '',
  btnClassName = '',
  closeClassName = '',
  closeIcon = defaultCloseIcon,
}) => {
  return (
    <div className={classNames('flex items-center gap-1.5 rounded-lg bg-gray-1 px-3 py-2', chipClassName)}>
      <button className={classNames('text-sm', btnClassName)} onClick={onClick}>
        {searchTerm.length > 7 ? searchTerm.substring(0, 7) + '...' : searchTerm}
      </button>
      <button
        className={classNames('text-white hover:text-red-500 text-sm font-semibold', closeClassName)}
        onClick={onDelete}
        aria-label="close"
        data-testid="close-button"
      >
        {closeIcon}
      </button>
    </div>
  );
};

export default NChip;

const defaultCloseIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Close-small (&#229;&#133;&#179;&#233;&#151;&#173;-&#229;&#176;&#143;)">
      <path
        id="Vector"
        d="M5.83398 5.83398L14.1673 14.1673"
        stroke="#9B9B9B"
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M5.83398 14.1673L14.1673 5.83398"
        stroke="#9B9B9B"
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
