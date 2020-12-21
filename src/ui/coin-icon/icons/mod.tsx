import React from 'react';

interface ModProps {
  color?: string;
  size?: string | number;
}

const Mod = (props: ModProps) => {
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
      <g fill="currentColor">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm6.985-10.993V8.08l-6.312 6.45zM9 7v17.985l8.77-8.998-8.466-8.675z" />
        <path d="M22.985 21.007V8.08l-6.312 6.449z" opacity=".5" />
      </g>
    </svg>
  );
};

export default Mod;
