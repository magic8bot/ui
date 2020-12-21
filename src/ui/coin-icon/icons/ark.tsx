import React from 'react';

interface ArkProps {
  color?: string;
  size?: string | number;
}

const Ark = (props: ArkProps) => {
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
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-.053-18.653L27 25 15.996 7 5 24.891l10.947-11.544zm1.588 4.585v.017l-1.662-1.953-1.76 1.936h3.422zm-6.6 3.177h9.859l-1.998-2.045-5.92.025v.009l-1.94 1.987v.024z"
      />
    </svg>
  );
};

export default Ark;
