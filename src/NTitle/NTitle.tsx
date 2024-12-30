import { NTruncatedText } from '../NText';
import React from 'react';

export default function NTitle({
  title,
  className,
  lines = 1,
}: {
  title: string | undefined;
  className?: string;
  lines?: 1 | 2 | 3;
}) {
  return (
    <NTruncatedText
      lines={lines ?? 1}
      text={title && title.length > 0 ? title : 'No title added'}
      className={className}
    />
  );
}
