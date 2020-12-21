import React from 'react';

interface ExmoProps {
  color?: string;
  size?: string | number;
}

const Exmo = (props: ExmoProps) => {
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
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm3.7-18.945L19.171 12l-1.1.5-2.885 7.797 1.1-.5.526 1.055.018-.047 2.868-7.75zm7.18.183l.064-.183L26.419 12l-1.1.5-2.867 7.76-.067.182 1.1-.5.527 1.058 2.868-7.762zm-6.14 6.712l1.689-4.563-1.103.5-.524-1.057-1.694 4.562.525 1.058 1.107-.5zm-9.137-4.5H6.558l.86.8-.86.813h5.04l.856-.813-.851-.8zM5.86 18.833L5 19.64l.86.805h8.155l-.857-.805.857-.808H5.86zm2.501-6.768l-.86.808.86.805h8.15l-.854-.806.855-.807h-8.15z"
      />
    </svg>
  );
};

export default Exmo;