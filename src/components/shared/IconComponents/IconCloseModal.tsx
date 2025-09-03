import * as React from "react";
const IconCloseModal = ({handleClose}: {handleClose: () => void}) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
    onClick={handleClose}
  >
    <circle cx={16} cy={16} r={16} fill="#DFE2E9" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.2455 15.9998L9.57621 10.3305C9.38095 10.1352 9.38095 9.81861 9.57621 9.62335L9.62335 9.57621C9.81861 9.38095 10.1352 9.38095 10.3305 9.57621L15.9998 15.2455L21.6691 9.57621C21.8644 9.38095 22.1809 9.38095 22.3762 9.57621L22.4233 9.62335C22.6186 9.81861 22.6186 10.1352 22.4233 10.3305L16.754 15.9998L22.4233 21.6691C22.6186 21.8644 22.6186 22.1809 22.4233 22.3762L22.3762 22.4233C22.1809 22.6186 21.8644 22.6186 21.6691 22.4233L15.9998 16.754L10.3305 22.4233C10.1352 22.6186 9.81861 22.6186 9.62335 22.4233L9.57621 22.3762C9.38095 22.1809 9.38095 21.8644 9.57621 21.6691L15.2455 15.9998Z"
      fill="#0B0C7D"
      stroke="#0B0C7D"
      strokeWidth={0.5}
    />
  </svg>
);
export default IconCloseModal;
