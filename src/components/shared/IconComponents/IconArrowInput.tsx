import { appColors } from "@/theme/colors";

const IconArrowInput = ({ fill = `${appColors.black}` }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.75 7L7.75 10L10.75 7" stroke={fill} strokeLinecap="square" />
  </svg>
);
export default IconArrowInput;
