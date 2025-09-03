import {
  Divider,
  Flex,
  Group,
  Loader,
  MultiSelect,
  MultiSelectProps,
  Select,
  SelectProps,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput, DateInputProps } from '@mantine/dates';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import React, { useState } from 'react';
import { customDateInputStlyes } from '@/utils/customDateInputStyles';
import IconArrowDown from '../IconComponents/IconArrowDown';
import IconDateTime from '../IconComponents/IconDateTime';
import { InputErrorStyle } from '../CustomTextInput';
import styles from './style.module.css';
import { appColors } from '@/theme/colors';
import { css } from '@emotion/react';

interface CustomFormSelectProp<
  T extends FieldValues,
  TName extends FieldPath<T>,
> extends SelectProps {
  name: TName;
  control: Control<T>;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  width?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
}
interface CustomFormDateInputProp<
  T extends FieldValues,
  TName extends FieldPath<T>,
> extends DateInputProps {
  name: TName;
  control: Control<T>;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  width?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const CustomFormSelect = <
  T extends FieldValues,
  TName extends FieldPath<T>,
>({
  placeholder,
  width,
  name,
  control,
  required,
  data,
  icon,
  disabled,
  isLoading = false,
  fullWidth,
  label,
  ...Others
}: CustomFormSelectProp<T, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T, TName>({ name, control });

  const handleOnChange = (value: string | null) => {
    field.onChange(value);
  };

  return (
    <Group>
      <Select
        {...Others}
        {...field}
        label={label}
        w={fullWidth ? '100%' : width}
        data={data}
        autoComplete={'off'}
        disabled={disabled}
        required={required}
        fw={500}
        error={error?.message}
        placeholder={placeholder}
        rightSection={
          isLoading ? <Loader size="xs" /> : (icon ?? <IconArrowDown />)
        }
        onChange={handleOnChange}
        styles={InputErrorStyle}
      />
    </Group>
  );
};

export const CustomFormCountrySelect = <
  T extends FieldValues,
  TName extends FieldPath<T>,
>({
  placeholder,
  width,
  name,
  control,
  required,
  data,
  icon,
  disabled,
  styles,
  ...Others
}: CustomFormSelectProp<T, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T, TName>({ name, control });

  const handleOnChange = (value: string | null) => {
    field.onChange(value);

    // if (Others.onChange !== undefined) {
    //   Others.onChange(value);
    // }
  };

  return (
    <Group>
      <Select
        {...Others}
        {...field}
        w={width}
        data={data}
        autoComplete={'off'}
        disabled={disabled}
        required={required}
        error={error?.message}
        placeholder={placeholder}
        rightSection={icon ?? <IconArrowDown />}
        onChange={handleOnChange}
        styles={{ ...InputErrorStyle, ...styles }}
      />
    </Group>
  );
};

export const CustomFormDateSelect = <
  T extends FieldValues,
  TName extends FieldPath<T>,
>({
  placeholder,
  width,
  name,
  control,
  label,
  required,
  ...Others
}: CustomFormDateInputProp<T, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T, TName>({ name, control });

  const getValue = () => {
    if (field.value === undefined) {
      return null;
    }

    return field.value;
  };

  return (
    <Group gap={4} w={'100%'}>
      <DateInput
        {...field}
        {...Others}
        value={getValue()}
        w={width}
        autoComplete={'off'}
        label={label}
        required={required}
        error={error?.message}
        placeholder={placeholder}
        rightSection={<IconDateTime color="#DFE2E9" />}
        styles={{
          label: {
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '6px',
            color: appColors.text,
          },
        }}
      />
    </Group>
  );
};

export const CustomFormDateSelectPastDate = <
  T extends FieldValues,
  TName extends FieldPath<T>,
>({
  placeholder,
  width,
  name,
  control,
  label,
}: {
  name: TName;
  control: Control<T>;
  placeholder: string;
  width?: string;
  label?: string;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController<T, TName>({ name, control });
  const [isDateFocused, setDateFocused] = useState<boolean>(false);

  const getValue = () => {
    if (field.value === undefined) {
      return null;
    }

    return field.value;
  };
  return (
    <Group>
      <DateInput
        {...field}
        data-cy={'date-of-birth'}
        value={getValue()}
        w={width}
        label={label}
        autoComplete={'off'}
        error={error?.message}
        placeholder={isDateFocused ? 'YYYY-MM-DD' : placeholder}
        rightSection={<IconDateTime />}
        // excludeDate={(date: Date) => date > new Date()}
        styles={(theme) => customDateInputStlyes(theme)}
        onFocus={() => setDateFocused(true)}
      />
    </Group>
  );
};

interface IdFormInputProps<T extends FieldValues, TName extends FieldPath<T>> {
  control: Control<T>;
  idTypeName: FieldPath<T>;
  textInputName: FieldPath<T>;
  idTypeOptions: Array<{ label: string; value: string }>;
  description?: string;
  disabled?: boolean;
}

export const IdFormInput = <T extends FieldValues, TName extends FieldPath<T>>({
  idTypeName,
  textInputName,
  control,
  description,
  disabled = false,
  idTypeOptions,
}: IdFormInputProps<T, TName>) => {
  const {
    field: { ref: IdTypeRef, value: idTypeValue, onChange: idTypeOnChange },
    fieldState: { error: idTypeError },
  } = useController({ name: idTypeName, control });
  const {
    field: { ref: IdCodeRef, value: idCodeValue, onChange: idCodeOnChange },
    fieldState: { error: idCodeError },
  } = useController({ name: textInputName, control });

  return (
    <Flex w="100%" direction={'column'}>
      {description && (
        <Text size={'xs'} fw={400} c={'#868e96'} mb={2}>
          {description}
        </Text>
      )}
      <Flex>
        <Select
          disabled={disabled}
          data={idTypeOptions}
          value={idTypeValue}
          ref={IdTypeRef}
          miw="160px"
          autoComplete={'off'}
          onChange={idTypeOnChange}
          rightSection={<IconArrowDown />}
          placeholder="Select ID type"
          data-testid={idTypeName}
          error={idTypeError?.message}
          styles={{
            root: { border: 'none' },
            wrapper: { borderRadius: '0px' },
            input: { borderRadius: '8px 0rem 0rem 8px', borderRight: '0px' },
          }}
          radius={'lg'}
        />
        <Divider orientation="vertical" />
        <TextInput
          disabled={disabled}
          ref={IdCodeRef}
          value={idCodeValue || ''}
          placeholder="ID number"
          error={idCodeError?.message}
          onChange={idCodeOnChange}
          autoComplete={'off'}
          data-testid={textInputName}
          w="100%"
          styles={{
            ...InputErrorStyle,
            input: {
              ...InputErrorStyle.input,
              borderRadius: '0rem 8px 8px 0rem',
            },
          }}
        />
      </Flex>
    </Flex>
  );
};

interface CustomFormMultiSelectProp<
  T extends FieldValues,
  TName extends FieldPath<T>,
> extends MultiSelectProps {
  name: TName;
  control: Control<T>;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  width?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const MultiSelectInputStyle = {
  error: { color: appColors.red },
  label: {
    fontWeight: '600',
    marginBottom: '4px',
    fontSize: '14px',
    color: appColors.text,
    '.mantine-MultiSelect-required': {
      color: appColors.red,
    },
  },
  input: {
    '&[data-invalid]': {
      color: appColors.red,
      borderColor: appColors.red,

      '.mantine-MultiSelect-searchInput': {
        '&::placeholder': {
          color: appColors.red,
        },
      },
    },
    overflowY: 'scroll',
  },
} as const;

export const CustomFormMultiSelect = <
  T extends FieldValues,
  TName extends FieldPath<T>,
>({
  placeholder,
  width,
  name,
  control,
  required,
  data,
  icon,
  disabled,
  isLoading = false,
  fullWidth,
  ...others
}: CustomFormMultiSelectProp<T, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T, TName>({ name, control });

  const handleOnChange = (value: string[]) => {
    field.onChange(value);

    if (others.onChange !== undefined) {
      others.onChange(value);
    }
  };

  return (
    <Group gap={4} w={'100%'}>
      <MultiSelect
        {...others}
        {...field}
        w={fullWidth ? '100%' : width}
        data={data}
        disabled={disabled}
        autoComplete={'off'}
        error={error?.message}
        placeholder={placeholder}
        onChange={handleOnChange}
        styles={MultiSelectInputStyle}
        rightSection={
          isLoading ? <Loader size="xs" /> : (icon ?? <IconArrowDown />)
        }
      />
      {required && '*'}
    </Group>
  );
};

interface CustomFormDatePickerProp<
  T extends FieldValues,
  TName extends FieldPath<T>,
> extends DateInputProps {
  name: TName;
  control: Control<T>;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  width?: string;
}

const DatePickerStyle = {
  error: { color: appColors.red },
  label: {
    '.mantine-DateInput-required': {
      color: appColors.red,
    },
  },
  input: {
    '&[data-invalid]': {
      color: appColors.red,
      borderColor: appColors.red,

      '&::placeholder': {
        color: appColors.red,
      },
    },
    overflowY: 'scroll',
  },
} as const;

export const CustomFormDatePicker = <
  T extends FieldValues,
  TName extends FieldPath<T>,
>({
  placeholder,
  width,
  name,
  control,
  required,
  icon,
  ...others
}: CustomFormDatePickerProp<T, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T, TName>({ name, control });

  const getValue = () => {
    if (field.value === undefined) {
      return null;
    }

    return field.value;
  };
  return (
    <Group gap={4} w={'100%'}>
      <DateInput
        {...others}
        {...field}
        value={getValue()}
        w={width}
        autoComplete={'off'}
        error={error?.message}
        placeholder={placeholder}
        rightSection={icon ?? <IconDateTime />}
        styles={DatePickerStyle}
      />
      {required && '*'}
    </Group>
  );
};
