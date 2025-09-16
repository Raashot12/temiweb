const IconInputClose = ({
  onclick,
  fill = '#A6AFC2',
}: {
  onclick?: () => void;
  fill?: string;
}) => (
  <svg
    width={7}
    height={4}
    viewBox="0 0 7 4"
    style={{ cursor: 'pointer' }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onclick}
  >
    <path
      d="M3.14647 3.85355C3.34173 4.04882 3.65832 4.04882 3.85358 3.85355L6.85358 0.853553C7.16856 0.538571 6.94548 -5.31195e-09 6.50003 0L0.500026 7.1549e-08C0.054574 7.6861e-08 -0.16851 0.53857 0.146472 0.853553L3.14647 3.85355Z"
      fill={fill}
    />
  </svg>
);
export default IconInputClose;

export const IconInputOpened = ({
  onclick,
  fill = '#A6AFC2',
}: {
  onclick?: () => void;
  fill?: string;
}) => (
  <svg
    width={7}
    height={4}
    viewBox="0 0 7 4"
    fill="none"
    onClick={onclick}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.85353 0.146447C3.65827 -0.0488153 3.34168 -0.0488158 3.14642 0.146446L0.14642 3.14645C-0.168562 3.46143 0.054522 4 0.499974 4L6.49997 4C6.94543 4 7.16851 3.46143 6.85353 3.14645L3.85353 0.146447Z"
      fill={fill}
    />
  </svg>
);
