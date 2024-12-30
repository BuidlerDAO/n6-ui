import React, { useState } from 'react';
import { NModal } from '../NModal';
import { ButtonState, NButtons } from '../NButtons';
import { NTruncatedText } from '../NText';
import classNames from 'classnames';

export type SelectOptions = {
  key: string;
  label: string;
};

export type NSelectProps = {
  title: string;
  defaultKey?: string | null;
  onChange?(key: string | null): void;
  options?: SelectOptions[];
  leftSide?: React.ReactNode | null;
  RightIcon: React.ReactNode;
  CheckIcon: React.ReactNode;
  containerClassName?: string;
};

const NSelect: React.FC<NSelectProps> = ({
  title,
  defaultKey,
  options = [],
  onChange,
  leftSide = <span>Add a</span>,
  RightIcon,
  CheckIcon,
  containerClassName = '',
}: NSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOptions | null>(() => {
    if (defaultKey == null) return null;
    return options?.find((option) => option.key === defaultKey) ?? null;
  });
  const [confirmedOption, setConfirmedOption] = useState<SelectOptions | null>(() => {
    if (defaultKey == null) return null;
    return options?.find((option) => option.key === defaultKey) ?? null;
  });

  return (
    <div
      className={classNames(
        'relative flex h-[50px] w-full cursor-pointer flex-row items-center space-x-1 rounded-[20px] bg-gray-1 px-4 text-[white]',
        containerClassName,
      )}
      onClick={() => setOpen(true)}
    >
      {leftSide}
      <span className="flex-grow-1 flex flex-shrink-0 items-center">
        <NTruncatedText text={`${confirmedOption && confirmedOption.label}`} className="" />
        <span className={classNames(open ? 'rotate-90' : 'rotate-0', 'ml-[10px] transition-all')}>{RightIcon}</span>
      </span>
      <NModal
        zIndex={9999}
        open={open}
        onClose={() => {
          setTimeout(() => setOpen(false), 0);
        }}
        footer={
          <NButtons
            state={ButtonState.Primary}
            className="mt-[20px]"
            onClick={() => {
              setConfirmedOption(selectedOption);
              onChange?.(selectedOption?.key ?? null);
              setTimeout(() => setOpen(false), 0);
            }}
          >
            Confirm
          </NButtons>
        }
      >
        <div className="h-full overflow-auto text-[white]">
          <div className="border-b border-[#FFFFFF1A] pb-[20px] text-center">{title}</div>
          {options.map((option) => (
            <div
              key={option.key}
              className="flex cursor-pointer justify-between border-b border-[#FFFFFF1A] py-[10px] text-left"
              onClick={() => setSelectedOption(option)}
            >
              {option.label}
              {option.key === selectedOption?.key && <span className="text-main">{CheckIcon}</span>}
            </div>
          ))}
        </div>
      </NModal>
    </div>
  );
};

export default NSelect;
