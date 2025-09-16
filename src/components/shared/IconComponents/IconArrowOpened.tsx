const IconArrowOpened = ({ onclick }: { onclick?: () => void }) => (
  <svg
    width={9}
    height={6}
    viewBox="0 0 9 6"
    style={{ cursor: 'pointer' }}
    onClick={onclick}
    aria-label={'arrowOpened'}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 4.5L4.5 1.5L1.5 4.5"
      stroke="#051438"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconArrowOpened;
