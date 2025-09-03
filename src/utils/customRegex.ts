const CustomRegex = {
  name: /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z]*)?$/,
  number: /^[0-9]+$/,
  alphabets: /^[A-za-z]+$/,
  alphabetAndNumbers: /^[A-za-z0-9]+$/,
} as const;

export default CustomRegex;
