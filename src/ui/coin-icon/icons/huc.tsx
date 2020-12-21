import React from 'react';

interface HucProps {
  color?: string;
  size?: string | number;
}

const Huc = (props: HucProps) => {
  const { color = 'currentColor', size = '24', ...otherProps } = props;
  return (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      {...otherProps}
      viewBox="0 0 33 32"
    >
      <path
        d="M11.5 14.5V6h-3v16h3v-4.5h9V26h3V10h-3v4.5zM16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Huc;
