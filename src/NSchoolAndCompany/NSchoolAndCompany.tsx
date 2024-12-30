/* eslint-disable react/no-unknown-property */

import React from 'react';
import { NTruncatedText } from '../NText';

function UnknownCompany({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="14" height="14" rx="7" fill="#262626" />
      <path
        d="M4.91602 4.91602C4.91602 4.22566 5.47566 3.66602 6.16602 3.66602H8.04102C8.73137 3.66602 9.29102 4.22566 9.29102 4.91602V5.33268H4.91602V4.91602Z"
        stroke="#C0C0C0"
        stroke-width="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.83398 7.20898L6.89959 8.22538C6.96594 8.24198 7.03536 8.24198 7.10171 8.22538L11.1673 7.20898V9.91732C11.1673 10.1474 10.9808 10.334 10.7507 10.334H3.25065C3.02053 10.334 2.83398 10.1474 2.83398 9.91732V7.20898Z"
        stroke="#C0C0C0"
        stroke-width="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.1673 7.62565V5.75065C11.1673 5.52053 10.9808 5.33398 10.7507 5.33398H3.25065C3.02053 5.33398 2.83398 5.52053 2.83398 5.75065V7.62565"
        stroke="#C0C0C0"
        stroke-width="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.52018 6.79232C7.52018 7.07996 7.28699 7.31315 6.99935 7.31315C6.7117 7.31315 6.47852 7.07996 6.47852 6.79232C6.47852 6.50467 6.7117 6.27148 6.99935 6.27148C7.28699 6.27148 7.52018 6.50467 7.52018 6.79232Z"
        fill="#C0C0C0"
      />
    </svg>
  );
}

function UnknownSchool({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="14" height="14" rx="7" fill="#262626" />
      <path
        d="M3.04102 5.33333L6.99935 3.25L10.9577 5.33333L6.99935 7.41667L3.04102 5.33333Z"
        stroke="#C0C0C0"
        stroke-width="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.29102 6.16602V9.17935C4.29102 9.48439 4.51083 9.74668 4.80583 9.82422C5.26514 9.94497 5.96943 10.1701 6.65689 10.5471C6.86966 10.6638 7.12904 10.6638 7.34181 10.5471C8.02927 10.1701 8.73356 9.94497 9.19287 9.82422C9.48787 9.74668 9.70768 9.48439 9.70768 9.17935V6.16602"
        stroke="#C0C0C0"
        stroke-width="0.8"
        stroke-linejoin="round"
      />
      <path
        d="M10.959 5.33398V8.66732"
        stroke="#C0C0C0"
        stroke-width="0.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default function NSchoolAndCompany({
  company,
  school,
}: {
  company: string | undefined;
  school: string | undefined;
}) {
  return (
    <div className="flex h-[18px] w-full items-center space-x-[8px]">
      <div className="flex min-w-0 items-center space-x-[4px]">
        <UnknownCompany className="mr-1 h-[14px] w-[14px] flex-shrink-0" />
        <NTruncatedText
          text={company ?? 'Unknown Company'}
          style={{ lineHeight: '14px', height: '14px', margin: 0 }}
          className="text-[10px] text-gray-4"
        />
      </div>

      <div className="flex min-w-0 items-center space-x-[4px]">
        <UnknownSchool className="mr-1 h-[14px] w-[14px] flex-shrink-0" />
        <NTruncatedText
          text={school ?? 'Unknown School'}
          style={{ lineHeight: '14px', height: '14px', margin: 0 }}
          className="text-[10px] text-gray-4"
        />
      </div>
    </div>
  );
}
