const IconArrowNextMobile = ({
  onclick,
  fill = '#051438',
}: {
  onclick?: () => void;
  fill?: string;
}) => (
  <svg width={5} height={8} viewBox="0 0 5 8" fill="none" onClick={onclick}>
    <path
      d="M0.929688 7.1998L4.12969 3.9998L0.929688 0.799805"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconArrowNextMobile;
