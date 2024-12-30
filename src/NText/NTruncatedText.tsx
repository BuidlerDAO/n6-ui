import React from 'react';
import classNames from 'classnames';
interface NTruncatedTextProps {
  text: string | undefined;
  lines?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
}

const NTruncatedText: React.FC<NTruncatedTextProps> = ({ text, lines = 1, className, style }) => {
  const containerClass = classNames(className, 'break-all  text-clip', {
    'line-clamp-1': lines === 1,
    'line-clamp-2': lines === 2,
    'line-clamp-3': lines === 3,
  });

  return (
    <div className={containerClass} style={style}>
      {text}
    </div>
  );
};

export default NTruncatedText;
