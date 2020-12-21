import React from 'react';

interface LptProps {
  color?: string;
  size?: string | number;
}

const Lpt = (props: LptProps) => {
  const { color = 'currentColor', size = '24', ...otherProps } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      {...otherProps}
    >
      <path
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-1.775-8.517v3.509h3.508v-3.509h-3.508zm0-15.483v3.508h3.508V8h-3.508zm8.267 0v3.508H26V8h-3.508zM6 8v3.508h3.508V8H6zm12.358 7.742v3.508h3.509v-3.508h-3.509zm-8.275 0v3.508h3.509v-3.508h-3.509z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Lpt;
