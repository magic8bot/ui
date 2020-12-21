import React from 'react';

interface EmcProps {
  color?: string;
  size?: string | number;
}

const Emc = (props: EmcProps) => {
  const { color = 'currentColor', size = '24', ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      {...otherProps}
      viewBox="0 0 33 32"
    >
      <path
        fill="currentColor"
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM8 8v3.2h6.4v3.2H8v3.2h9.6v-6.4h3.2v9.6H8V24h16V8H8z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Emc;
