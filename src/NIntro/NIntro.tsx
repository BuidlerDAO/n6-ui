import classNames from 'classnames';
import { NTruncatedText } from '../NText';
import React from 'react';

export default function Intro({ intro, className }: { intro: string | undefined; className?: string }) {
  return (
    <NTruncatedText
      lines={3}
      text={intro && intro.length > 0 ? intro : 'This user has not added a self-introduction'}
      className={classNames('text-[14px] text-[#fff]', className)}
    />
  );
}
