import React, { FormEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

// Define the bitwise enumeration
export enum InputState {
  None = 0, // No state
  Error = 1, // 0001 (1 << 0)
  Search = 2, // 0010 (1 << 1)
  Disabled = 4, // 0100 (1 << 2)
  Focused = 8, // 1000 (1 << 3)
}

export type NInputProps = {
  state?: InputState; // Accept bitwise state
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  value?: string;
  onChange?(value: string): void;
  searchIcon?: React.ReactNode;
  debounceTime?: number;
};

export const NInput: React.FC<NInputProps> = ({
  placeholder = '',
  containerClassName = '',
  inputClassName = '',
  onChange,
  value,
  state = InputState.None, // Default to 'None'
  searchIcon,
  debounceTime = 200,
}) => {
  const [focus, setFocus] = useState(false);
  const [content, setContent] = useState('');
  const debouncedOnChange = useRef(debounce((value: string) => onChange?.(value), debounceTime));
  const isControlled = value != null;

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    if (!isControlled) {
      setContent(inputValue);
      debouncedOnChange.current(inputValue);
    } else {
      onChange?.(inputValue);
    }
  };

  return (
    <div
      className={classNames(
        'relative h-[46px] w-full',
        state & InputState.Search ? 'pl-[48px]' : 'rounded-[20px]',
        'border-[2px] border-[transparent] bg-gray-1 px-4 py-[12px] outline-none',
        containerClassName,
        (focus || state & InputState.Focused) &&
          (state & InputState.Search && value ? '!border-b-gray-2' : '!border-gray-2'),
        state & InputState.Error && '!border-[#E94344]',
        state & InputState.Disabled && 'cursor-not-allowed opacity-65', // Disabled state
      )}
    >
      {state & InputState.Search && <span className="absolute left-4">{searchIcon || <DefaultSearchIcon />}</span>}
      <input
        value={isControlled ? value : content}
        className={classNames(
          'm-0 block w-full bg-[transparent] p-0 leading-none text-[white] placeholder-[white] placeholder-opacity-50 caret-main outline-none',
          inputClassName,
        )}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        disabled={!!(state & InputState.Disabled)}
      />
    </div>
  );
};

const DefaultSearchIcon = () => (
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

export default NInput;
