import { Box } from "@mantine/core";

export const IconThreeDots = ({
  size = 14,
  color = "#051438",
  onclick,
}: {
  size?: number;
  color?: string;
  onclick?: () => void;
}) => (
  <svg
    height={size}
    onClick={onclick}
    viewBox="0 0 4 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.934 1.667a1.067 1.067 0 1 1 2.133 0 1.067 1.067 0 0 1-2.133 0ZM.934 7a1.067 1.067 0 1 1 2.133 0A1.067 1.067 0 0 1 .934 7Zm0 5.333a1.067 1.067 0 1 1 2.133 0 1.067 1.067 0 0 1-2.133 0Z"
      fill={color}
    />
  </svg>
);
