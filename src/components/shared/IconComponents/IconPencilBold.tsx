import * as React from 'react';

const IconPencilBold = ({
  size = 16,
  fill = '#A6AFC2',
  onClick,
}: {
  size?: number;
  fill?: string;
  onClick?: () => void;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height={size}
    style={{ cursor: 'pointer' }}
    fill={fill}
    onClick={onClick}
    viewBox="0 0 17 16"
  >
    <path
      d="M12.5506 0.15621C12.3413 -0.0520699 12.0019 -0.0520699 11.7925 0.15621L0.914062 10.9791V15.4667C0.914062 15.7612 1.15407 16 1.45013 16H5.96076L16.8392 5.17712C17.0486 4.96884 17.0486 4.63116 16.8392 4.42288L12.5506 0.15621Z"
      fill="#0B0C7D"
    />
  </svg>
);
export default IconPencilBold;
