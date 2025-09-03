import React from 'react';

const IconCaretRightSmall = ({ color = '#0B0C7D' }: { color?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.93359 11.2L10.1336 8.00005L6.93359 4.80005"
        stroke={color}
        stroke-linecap="square"
      />
    </svg>
  );
};

export default IconCaretRightSmall;
