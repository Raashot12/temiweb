const IconPlusColored = ({
  size = 16,
  fill = '#0B0C7D',
  onClick,
}: {
  size?: number;
  fill?: string;
  onClick?: () => void;
}) => (
  <svg
    height={size}
    style={{ cursor: 'pointer' }}
    viewBox="0 0 16 16"
    fill="none"
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM7.46667 11.7333V8.53333H4.26667V7.46667H7.46667V4.26667H8.53333V7.46667H11.7333V8.53333H8.53333V11.7333H7.46667Z"
      fill={fill}
    />
  </svg>
);
export default IconPlusColored;
