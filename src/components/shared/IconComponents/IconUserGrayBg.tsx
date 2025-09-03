const IconUserGrayBg = ({
  size = 26,
  color = "#A6AFC2",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={16} cy={16} r={16} fill={color} />
    <g clipPath="url(#clip0_16704_27320)">
      <path
        d="M16.0031 4C12.9106 4 10.4031 6.50508 10.4031 9.59687C10.4031 12.6887 12.9106 15.1937 16.0031 15.1937C19.0957 15.1937 21.6031 12.6887 21.6031 9.59687C21.6031 6.50508 19.0957 4 16.0031 4Z"
        fill="white"
      />
      <path
        d="M12.8031 18.3906C9.71051 18.3906 7.20312 20.8968 7.20312 23.9898V27.9854H24.8031V23.9898C24.8031 20.8968 22.2957 18.3906 19.2031 18.3906H12.8031Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_16704_27320">
        <rect x={4} y={4} width={24} height={24} rx={12} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default IconUserGrayBg;
