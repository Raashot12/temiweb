interface IconChevronRightProps {
  onClick?: () => void;
  color?: string;
  cursor?: string;
  style?: React.CSSProperties;
}
const IconChevronRight = ({
  onClick,
  color,
  cursor,
  style
}: IconChevronRightProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: cursor ?? 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        ...style
      }}
      aria-label="Chevron Right"
    >
      <svg
        width="5"
        height="8"
        viewBox="0 0 5 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.933301 0.799218L4.1333 3.99922L0.933301 7.19922"
          stroke={color || '#051438'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default IconChevronRight;
