import React from "react";
import { CustomIconProps } from "./types";

const IconUserCircle = ({
  fill = "#A6AFC2",
  width = 24,
  height = 24,
}: CustomIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill="#A6AFC2" />
      <path
        d="M15.9993 6C13.4222 6 11.3327 8.08757 11.3327 10.6641C11.3327 13.2406 13.4222 15.3281 15.9993 15.3281C18.5765 15.3281 20.666 13.2406 20.666 10.6641C20.666 8.08757 18.5765 6 15.9993 6Z"
        fill="white"
      />
      <path
        d="M13.3327 17.9922C10.7555 17.9922 8.66602 20.0807 8.66602 22.6582V25.9878H23.3327V22.6582C23.3327 20.0807 21.2432 17.9922 18.666 17.9922H13.3327Z"
        fill="white"
      />
    </svg>
  );
};

export default IconUserCircle;
