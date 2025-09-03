const IconNotificationBell = ({ size = 20, fill = "#0B0C7D" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0007 0C5.95056 0 2.66732 3.28325 2.66732 7.33333V13.3333H1.33398V14.6667H18.6673V13.3333H17.334V7.33333C17.334 3.28325 14.0507 0 10.0007 0Z"
      fill={fill}
    />
    <path
      d="M6.66732 16.6667V16H13.334V16.6667C13.334 18.5076 11.8416 20 10.0007 20C8.1597 20 6.66732 18.5076 6.66732 16.6667Z"
      fill={fill}
    />
  </svg>
);
export default IconNotificationBell;
