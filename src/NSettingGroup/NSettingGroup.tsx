import classNames from 'classnames';
import React from 'react';
import { NTruncatedText } from '../NTruncatedText';

export interface NSettingGroupItem {
  title: React.ReactElement | string;
  value: React.ReactElement | string;
  action: () => void;
}

export interface NSettingGroupProps {
  items: NSettingGroupItem[] | undefined;
}

const NSettingGroup = ({ items }: NSettingGroupProps) => {
  return (
    <div className="mt-[10px] rounded-[16px] bg-black-2 px-4 text-sm text-[white]">
      {items?.map((x: NSettingGroupItem, i: number) => {
        return (
          <div
            className={classNames(
              'flex h-[52px] items-center justify-between py-[10px]',
              i === items.length - 1 ? '' : 'border-b border-gray-1',
            )}
            key={i}
            onClick={x.action}
          >
            <div className="mr-[16px] mt-[1px]">{x.title}</div>
            <div className="flex flex-row items-center overflow-hidden">
              {typeof x.value === 'string' && <NTruncatedText text={x.value + ''} className="text-gray-3" />}
              {React.isValidElement(x.value) && <span className="flex items-center text-gray-3">{x.value}&nbsp;</span>}
              <span className="rotate-180 text-gray-3">
                <LeftIcon />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NSettingGroup;

function LeftIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.208 16.5L8.70801 11L14.208 5.5"
        stroke="currentColor"
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
