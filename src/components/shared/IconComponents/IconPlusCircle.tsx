import React from "react";

const IconPlusCircle = ({ color = "#0B0C7D" }: { color?: string }) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.666016 8C0.666016 3.58172 4.24774 0 8.66602 0C13.0843 0 16.666 3.58172 16.666 8C16.666 12.4183 13.0843 16 8.66602 16C4.24774 16 0.666016 12.4183 0.666016 8ZM8.13268 11.7333V8.53333H4.93268V7.46667H8.13268V4.26667H9.19935V7.46667H12.3993V8.53333H9.19935V11.7333H8.13268Z"
        fill={color}
      />
    </svg>
  );
};

export default IconPlusCircle;
