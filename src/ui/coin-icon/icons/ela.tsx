import React from 'react';

interface ElaProps {
  color?: string;
  size?: string | number;
}

const Ela = (props: ElaProps) => {
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
      <g fill="currentColor" fillRule="evenodd">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM6 10.23l10 5.704 10-5.704-5-2.8-5.004 2.872L11 7.432l-5 2.799zm0 9l10 5.704 10-5.704-5-2.8-5 2.874-5-2.871-5 2.798z" />
        <g fillRule="nonzero">
          <path
            d="M11 22.119l5-2.82v5.635l-5-2.815zm0-9l5-2.82v5.635l-5-2.815z"
            fillOpacity=".4"
          />
          <path
            d="M26 19.23l-5 2.886V16.43l5 2.8zm0-9l-5 2.886V7.43l5 2.8z"
            fillOpacity=".7"
          />
          <path
            d="M11 22.116v-5.683l5 2.87-5 2.813zm0-9V7.433l5 2.87-5 2.813z"
            fillOpacity=".8"
          />
          <path d="M21 22.116l-5-2.812 5-2.874v5.686zm0-9l-5-2.812 5-2.874v5.686z" />
          <path
            d="M21 22.116l-5 2.818v-5.63l5 2.812zm0-9l-5 2.818v-5.63l5 2.812z"
            fillOpacity=".6"
          />
          <path
            d="M11 16.433v5.683l-5-2.885 5-2.798zm0-9v5.683l-5-2.885 5-2.798z"
            fillOpacity=".5"
          />
        </g>
      </g>
    </svg>
  );
};

export default Ela;
