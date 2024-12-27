import React, { FormEvent, useRef, useState } from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

interface NSearchInputProps {
  containerClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  clearIconClassName?: string;
  onSearch?(value: string): void;
  searchIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  debounceTime?: number;
}

const NSearchInput: React.FC<NSearchInputProps> = ({
  containerClassName,
  inputClassName,
  placeholder = 'Search name',
  clearIconClassName,
  onSearch,
  searchIcon,
  clearIcon,
  debounceTime = 200,
}) => {
  const [focus, setFocus] = useState(false);
  const [content, setContent] = useState('');
  const debouncedOnSearch = useRef(debounce((value: string) => onSearch?.(value), debounceTime));

  function handleFocus() {
    setFocus(true);
  }

  function handleInput(event: FormEvent<HTMLInputElement>) {
    setContent(event.currentTarget.value);
    debouncedOnSearch.current(event.currentTarget.value);
  }

  function handleClear() {
    setContent('');
    debouncedOnSearch.current('');
    onSearch?.('');
  }

  return (
    <div
      className={classnames(
        'flex items-center relative h-[42px] rounded-[20px] pr-4 py-[10px] pl-[48px] outline-none',
        containerClassName,
        focus ? 'bg-gray-1' : 'bg-black-2',
      )}
    >
      <span className="absolute left-4">{searchIcon || <DefaultSearchIcon />}</span>
      <input
        value={content}
        className={classnames(
          'text-white block w-full bg-[transparent] p-0 placeholder-[white] placeholder-opacity-50 caret-main outline-none',
          inputClassName,
        )}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={() => setFocus(false)}
        onInput={handleInput}
      />
      {content && (
        <button
          onClick={handleClear}
          className={classnames(
            'text-white/50 absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer',
            clearIconClassName,
          )}
        >
          {clearIcon || <ClearIcon />}
        </button>
      )}
    </div>
  );
};

export default NSearchInput;

export function DefaultSearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.62498 17.4166C13.9282 17.4166 17.4166 13.9282 17.4166 9.62498C17.4166 5.32178 13.9282 1.83331 9.62498 1.83331C5.32178 1.83331 1.83331 5.32178 1.83331 9.62498C1.83331 13.9282 5.32178 17.4166 9.62498 17.4166Z"
        stroke="#9B9B9B"
        strokeWidth="1.83333"
        strokeLinejoin="round"
      />
      <path
        d="M15.2266 15.2266L19.1157 19.1157"
        stroke="#9B9B9B"
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white/50 hover:text-white"
    >
      <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
