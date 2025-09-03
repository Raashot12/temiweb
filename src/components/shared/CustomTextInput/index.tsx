import {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
} from "react-hook-form";
import {
  Autocomplete,
  AutocompleteProps,
  NumberInput,
  rem,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { JSX } from "react";
import { appColors } from "@/theme/colors";

interface CustomFormInputProp<T extends FieldValues> extends TextInputProps {
  name: FieldPath<T>;
  control: Control<T>;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  trimInput?: boolean;
  isIntegerInput?: boolean;
  width?: string;
  disabled?: boolean;
  label?: string;
  type?: string;
  fullWidth?: boolean;
  handleChange?: (value: string) => void;
}
interface CustomFormAutoCompleteProp<T extends FieldValues>
  extends AutocompleteProps {
  name: FieldPath<T>;
  control: Control<T>;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  trimInput?: boolean;
  isIntegerInput?: boolean;
  width?: string;
  disabled?: boolean;
  label?: string;
  type?: string;
  fullWidth?: boolean;
  handleChange?: (value: string) => void;
}

export const InputErrorStyle = {
  error: { color: appColors?.red, fontWeight: 500 },
  label: {
    color: appColors?.text,
    fontWeight: 600,
    fontSize: rem(14),
    marginBottom: rem(6),
    padding: 0,
  },
  input: {
    padding: "10px 12px",
    "&::placeholder": {
      color: appColors?.lowerText,
      fontWeight: 500,
      fontSize: "16px",
    },
    "&[data-invalid]": {
      color: appColors?.red,
      borderColor: appColors?.red,

      "&::placeholder": {
        color: appColors?.red,
        fontSize: "16px",
      },
    },
  },
} as const;

export const CustomFormInput = <T extends FieldValues>({
  placeholder,
  width,
  required,
  name,
  control,
  isIntegerInput,
  icon,
  disabled,
  handleChange,
  type = "text",
  label,
  fullWidth,
  ...others
}: CustomFormInputProp<T>) => {
  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error },
  } = useController<T, FieldPath<T>>({ name, control });

  const getValue = (input: PathValue<T, FieldPath<T>>): string => {
    if (isIntegerInput) {
      return input === undefined || input === "" ? "" : `${input}`;
    }
    return input === undefined || input === null ? "" : String(input);
  };

  return (
    <TextInput
      w={fullWidth ? "100%" : width}
      ref={ref}
      type={type}
      label={label}
      autoComplete="off"
      value={getValue(value)}
      placeholder={placeholder}
      required={required}
      error={error?.message}
      onChange={(e) => {
        onChange(e);
        handleChange?.(e.target.value);
      }}
      onBlur={onBlur}
      rightSection={icon}
      styles={{
        ...InputErrorStyle,
        ...(others?.styles || {}),
      }}
      disabled={disabled}
      {...others}
    />
  );
};

interface CustomFormNumberInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  width?: string | number;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  handleChange?: (value: PathValue<T, FieldPath<T>> | null) => void;
  styles?: Record<string, any>;
  [key: string]: any;
}

export const CustomFormNumberInput = <T extends FieldValues>({
  placeholder,
  width,
  required,
  name,
  control,
  icon,
  disabled,
  handleChange,
  label,
  fullWidth,
  ...others
}: CustomFormNumberInputProps<T>) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController<T, FieldPath<T>>({ name, control });

  return (
    <NumberInput
      w={fullWidth ? "100%" : width}
      label={label}
      autoComplete="off"
      value={value === null || value === undefined ? "" : value}
      placeholder={placeholder}
      required={required}
      error={error?.message}
      onChange={(val: string | number) => {
        const parsed =
          val === "" || val === null || isNaN(Number(val)) ? null : Number(val);

        onChange(parsed as PathValue<T, FieldPath<T>>);
        handleChange?.(parsed as PathValue<T, FieldPath<T>> | null);
      }}
      onBlur={onBlur}
      rightSection={icon}
      thousandSeparator=","
      styles={others?.styles}
      disabled={disabled}
      {...others}
    />
  );
};

export const CustomFormAutoComplete = <T extends FieldValues>({
  placeholder,
  width,
  required,
  name,
  control,
  isIntegerInput,
  icon,
  disabled,
  handleChange,
  type = "text",
  label,
  fullWidth,
  ...others
}: CustomFormAutoCompleteProp<T>) => {
  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error },
  } = useController<T, FieldPath<T>>({ name, control });

  const getValue = (input: PathValue<T, FieldPath<T>>): string => {
    if (isIntegerInput) {
      return input === undefined || input === ""
        ? input
        : `${placeholder}: ${input}`;
    }

    return value || "";
  };

  return (
    <Autocomplete
      w={fullWidth ? "100%" : width}
      ref={ref}
      type={type}
      label={label}
      autoComplete={"off"}
      value={getValue(value)}
      placeholder={placeholder}
      required={required}
      error={error?.message}
      onChange={onChange}
      onBlur={() => {
        onBlur();
        handleChange?.(value);
      }}
      rightSection={icon}
      styles={{
        ...InputErrorStyle,
      }}
      disabled={disabled}
      {...others}
    />
  );
};

export const TextInputWithAsterisk = ({
  width,
  placeholder,
  required = false,
}: {
  width?: string;
  placeholder: string;
  required?: boolean;
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      required={required}
      autoComplete={"off"}
      styles={{
        ...InputErrorStyle,
        wrapper: { width: "100%" },
        root: { width: "100%" },
        input: { width: "100%" },
      }}
    />
  );
};
