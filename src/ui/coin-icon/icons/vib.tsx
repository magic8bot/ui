import React from 'react';

interface VibProps {
  color?: string;
  size?: string | number;
}

const Vib = (props: VibProps) => {
  const { color = 'currentColor', size = '24', ...otherProps } = props;
  return (
    <svg
      height={size}
      viewBox="0 0 33 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      {...otherProps}
    >
      <path
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM7 7l10.2 18H22V7h-3.6v12.775L11.2 7z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Vib;
