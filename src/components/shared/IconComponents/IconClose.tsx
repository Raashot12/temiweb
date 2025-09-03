const CloseIcon = ({
  testId = 'close-icon',
  handleClose,
  fill = '#DFE2E9',
  width = 32,
  height = 32,
}: {
  testId?: string;
  handleClose?: () => void;
  fill?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    data-testid={testId}
    width={width}
    height={height}
    viewBox="0 0 32 32"
    onClick={handleClose}
    style={{ cursor: ' pointer' }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={16} cy={16} r={16} fill={fill} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.2416 15.9998L9.5723 10.3305C9.37704 10.1352 9.37704 9.81861 9.5723 9.62335L9.61944 9.57621C9.81471 9.38095 10.1313 9.38095 10.3266 9.57621L15.9959 15.2455L21.6652 9.57621C21.8605 9.38095 22.177 9.38095 22.3723 9.57621L22.4194 9.62335C22.6147 9.81861 22.6147 10.1352 22.4194 10.3305L16.7501 15.9998L22.4194 21.6691C22.6147 21.8644 22.6147 22.1809 22.4194 22.3762L22.3723 22.4233C22.177 22.6186 21.8605 22.6186 21.6652 22.4233L15.9959 16.754L10.3266 22.4233C10.1313 22.6186 9.81471 22.6186 9.61944 22.4233L9.5723 22.3762C9.37704 22.1809 9.37704 21.8644 9.5723 21.6691L15.2416 15.9998Z"
      fill="#0B0C7D"
      stroke="#0B0C7D"
      strokeWidth={0.5}
    />
  </svg>
);
export default CloseIcon;
