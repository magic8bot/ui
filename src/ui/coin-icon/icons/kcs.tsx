import React from 'react';

interface KcsProps {
  color?: string;
  size?: string | number;
}

const Kcs = (props: KcsProps) => {
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
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-2.46-16l5.174-5.33 3.265 3.363a1.446 1.446 0 002.088 0 1.554 1.554 0 000-2.152l-4.309-4.44a1.456 1.456 0 00-2.088 0l-6.216 6.406v-3.808c0-.84-.662-1.522-1.477-1.522-.816 0-1.477.682-1.477 1.522v11.922c0 .84.661 1.522 1.477 1.522.811 0 1.477-.686 1.477-1.522v-3.808l6.216 6.405a1.456 1.456 0 002.088 0l4.31-4.44a1.554 1.554 0 000-2.151 1.446 1.446 0 00-2.09 0l-3.264 3.364L13.54 16zm5.176-1.523c-.816 0-1.478.682-1.478 1.523 0 .841.662 1.523 1.478 1.523s1.478-.682 1.478-1.523c0-.841-.662-1.523-1.478-1.523z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Kcs;