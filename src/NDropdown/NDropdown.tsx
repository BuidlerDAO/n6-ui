import React, { useState, useRef, useEffect } from 'react';

interface NDropdownOption {
  value: string | number;
  label: string;
}

interface NDropdownProps {
  options: NDropdownOption[];
  placeholder?: string;
  onSelect: (selected: NDropdownOption) => void;
  className?: string; // 支持传入自定义样式
}

const NDropdown: React.FC<NDropdownProps> = ({ options, placeholder = 'Select an option', onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<NDropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: NDropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative w-[218px] ${className} `}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white flex w-full justify-center px-4 py-2 text-left shadow-sm"
      >
        <span>{selectedOption?.label || placeholder}</span>
        <span className={`ml-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <NDropdownIcon />
        </span>
      </button>
      {isOpen && (
        <ul
          className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-[16px] bg-[#1B1B1B] px-[24px] shadow-md"
          style={{ borderColor: '#FFFFFF1A', borderWidth: '.5px', borderStyle: 'solid' }}
        >
          {options.map((option) => {
            const isSelected = selectedOption?.value === option.value;
            return (
              <li
                key={option.value}
                className="hover:bg-gray-100 flex h-[42px] cursor-pointer items-center justify-between"
                style={{
                  lineHeight: '42px',
                  color: isSelected ? 'inherit' : '#FFFFFFB2',
                }}
                onClick={() => handleOptionClick(option)}
              >
                <span> {option.label}</span>
                <div className="flex h-5 w-5 items-start justify-start">{isSelected && <NCheckSmall />}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

function NDropdownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 6.3335L8 10.3335L4 6.3335H12Z"
        fill="white"
        stroke="white"
        strokeWidth="1.83333"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NCheckSmall() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.58325 11.0003L9.16659 15.5837L18.3333 6.41699"
        stroke="#33EE94"
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default NDropdown;
