import React, { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { ClearIcon, DefaultSearchIcon } from '../NSearchInput';

export enum Step {
  Empty = 0,
  Typed = 1,
  Completed = 2,
}

export interface NSearchProps {
  containerClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  searchWord?: string;
  onSearch?(value: string): void;
  onInput?(value: string): void;
  step?: Step;
  debounceTime?: number;
  rightIcon?: React.ReactNode;
  rightIconClassName?: string;
}

const NSearch: React.FC<NSearchProps> = ({
  containerClassName,
  inputClassName,
  searchWord,
  onSearch,
  onInput,
  step,
  placeholder = 'Search',
  debounceTime = 200,
  rightIcon = <ClearIcon />,
  rightIconClassName = '',
}: NSearchProps) => {
  const [focus, setFocus] = useState(false);
  const [content, setContent] = useState(searchWord || '');
  const debouncedOnSearch = useRef(debounce((value: string) => onSearch?.(value), debounceTime));

  useEffect(() => {
    if (step === Step.Empty) {
      setContent('');
    }
  }, [step]);

  useEffect(() => {
    setContent(searchWord || '');
  }, [searchWord]);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
    onInput?.(event.currentTarget.value);
    // debouncedOnSearch.current(event.currentTarget.value)
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      debouncedOnSearch.current(content);
    }
  };

  const handleArrowClick = () => {
    setContent('');
    onInput?.('');
    // debouncedOnSearch.current('')
  };

  return (
    <div
      className={classnames(
        'relative h-[42px] rounded-[20px] px-4 py-[10px] pl-[48px] outline-none',
        containerClassName,
        focus ? 'bg-gray-1' : 'bg-black-2',
      )}
    >
      <span className="absolute left-4">
        <DefaultSearchIcon />
      </span>
      <input
        value={content}
        className={classnames(
          'text-white m-0 mt-[2px] block w-full bg-[transparent] p-0 placeholder-[white] placeholder-opacity-50 caret-main outline-none',
          inputClassName,
        )}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={() => setFocus(false)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      {content !== '' && step !== Step.Completed && (
        <span
          className={classnames(
            'absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer',
            rightIconClassName,
          )}
          onClick={handleArrowClick}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default NSearch;
