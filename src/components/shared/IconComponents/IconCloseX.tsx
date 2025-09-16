const IconCloseX = ({
  size = 14,
  fill = '#051438',
  onclick,
}: {
  size?: number;
  fill?: string;
  onclick?: () => void;
}) => (
  <svg
    width={size}
    height={size}
    style={{ cursor: 'pointer' }}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onclick}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.24553 7.00002L0.222656 0.977148L0.976903 0.2229L6.99978 6.24578L13.0227 0.2229L13.7769 0.977148L7.75403 7.00002L13.7769 13.0229L13.0227 13.7771L6.99978 7.75427L0.976903 13.7771L0.222656 13.0229L6.24553 7.00002Z"
      fill={fill}
    />
  </svg>
);
export default IconCloseX;
