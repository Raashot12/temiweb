import { Box } from '@mantine/core';

const IconArrowBackMobile = ({
  onclick,
  fill = '#051438',
  display,
}: {
  onclick?: () => void;
  fill?: string;
  display?: string;
}) => (
  <Box
    component="svg"
    width={5}
    height={8}
    viewBox="0 0 5 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onclick}
    display={{ display }}
  >
    <path
      d="M4.07031 0.800196L0.870313 4.0002L4.07031 7.2002"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Box>
);
export default IconArrowBackMobile;
