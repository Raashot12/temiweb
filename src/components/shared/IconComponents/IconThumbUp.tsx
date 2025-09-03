const IconThumbUp = ({ fill = "#FF4D4D" }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.44941 2.39563C7.82974 1.63497 7.56031 0.709732 6.83106 0.272182C6.07459 -0.181697 5.09424 0.0497344 4.62062 0.793997L2.4 4.28354V10C2.4 11.1046 3.29543 12 4.4 12H8.4C9.02952 12 9.62229 11.7036 10 11.2L12 8.53336V6.00002C12 4.89545 11.1046 4.00002 10 4.00002H6.64721L7.44941 2.39563Z"
        fill={fill}
      />
      <path d="M0 4.00002V12H0.8V4.00002H0Z" fill={fill} />
    </svg>
  );
};

export default IconThumbUp;
