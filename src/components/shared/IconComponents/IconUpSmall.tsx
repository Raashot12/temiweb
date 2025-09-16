const IconUpSmall = ({
  onclick,
  fill = '#051438',
  height = 16,
  width = 15,
}: {
  onclick?: () => void;
  fill?: string;
  height?: number;
  width?: number;
}) => (
  <svg
    width={width}
    height={height}
    onClick={onclick}
    viewBox="0 0 15 16"
    style={{ cursor: 'pointer' }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 7L7.5 10L10.5 7"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconUpSmall;
