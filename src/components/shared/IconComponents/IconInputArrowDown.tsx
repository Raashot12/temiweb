import * as React from 'react';

const IconInputArrowDown = ({
  size = 20,
  fill = '#051438',
}: {
  size?: number;
  fill?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 8.6665L10 12.6665L14 8.6665"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconInputArrowDown;
