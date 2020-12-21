import React from 'react';

interface VtcProps {
  color?: string;
  size?: string | number;
}

const Vtc = (props: VtcProps) => {
  const { color = 'currentColor', size = '24', ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill={color}
      {...otherProps}
    >
      <path
        fill="currentColor"
        d="M27.25 4.624a13.105 13.105 0 00-.312-.29L15.783 19.787l-4.263-5.438H4.582l-1.95 2.22H6.26l8.661 11.194c.29.272.576.408.862.408.285 0 .557-.136.816-.408L30.294 8.82a15.158 15.158 0 00-.295-.574A15.928 15.928 0 0132 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0c4.386 0 8.36 1.765 11.25 4.624z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Vtc;
