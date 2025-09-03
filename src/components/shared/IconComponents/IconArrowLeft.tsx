type IconArrowLeftProps = {
  handleClose?: () => void;
  size?: number;
  color?: string;
};

const IconArrowLeft = ({
  handleClose,
  size = 16,
  color = "#051438",
}: IconArrowLeftProps) => (
  <svg
    height={size}
    viewBox="0 0 15 16"
    fill="none"
    onClick={handleClose}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 14.5 3 8l7-6.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconArrowLeft;
