import { useState, useEffect } from 'react';
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from '@mantine/core';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { appColors } from '@/theme/colors';

type MultiSelectCreatableProps<T extends FieldValues> = {
  initialData: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  onCreate?: (newValue: { label: string; value: string }) => void;
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
};

export const MultiSelectCreatable = <T extends FieldValues>({
  initialData = [],
  label,
  placeholder,
  onCreate,
  control,
  name,
  disabled,
}: MultiSelectCreatableProps<T>) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [selectedValues, setSelectedValues] = useState<
    { label: string; value: string }[]
  >([]);
  const { field } = useController({ control, name });

  useEffect(() => {
    if (initialData.length) {
      setData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (field?.value) {
      setSelectedValues(field.value);
    }
  }, [field?.value]);

  const exactMatch = data?.some((item) => item.label === search);

  const handleOptionSubmit = (val: string) => {
    setSearch('');

    if (val === '$create') {
      const newItem = { label: search.trim(), value: search.trim() };
      setData((prev) => [...prev, newItem]);
      // setSelectedValues((prev) => [...prev, newItem]);
      onCreate?.(newItem);
      field?.onChange(selectedValues);
    } else {
      const selectedItem = data.find((item) => item.value === val);
      if (selectedItem) {
        const newSelectedValues = selectedValues.some(
          (v) => v.value === selectedItem.value
        )
          ? selectedValues.filter((v) => v.value !== selectedItem.value)
          : [...selectedValues, selectedItem];

        setSelectedValues(newSelectedValues);
        field?.onChange(newSelectedValues);
      }
    }
  };

  const handleValueRemove = (val: string) => {
    const newSelectedValues = selectedValues.filter((v) => v.value !== val);
    setSelectedValues(newSelectedValues);
    field?.onChange(newSelectedValues);
  };

  return (
    <div>
      {label && (
        <div
          style={{
            fontWeight: '600',
            marginBottom: '4px',
            fontSize: '14px',
            color: appColors.text,
          }}
        >
          {label}
        </div>
      )}
      <Combobox store={combobox} onOptionSubmit={handleOptionSubmit}>
        <Combobox.DropdownTarget>
          <PillsInput
            disabled={disabled}
            onClick={() => combobox.openDropdown()}
            styles={{
              input: {
                height: 'auto',
              },
            }}
          >
            <Pill.Group>
              {selectedValues.map((item) => (
                <Pill
                  key={item.value}
                  withRemoveButton
                  onRemove={() => handleValueRemove(item.value)}
                >
                  {item.label}
                </Pill>
              ))}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  value={search}
                  placeholder={placeholder}
                  onChange={(event) => {
                    setSearch(event.currentTarget.value);
                    combobox.updateSelectedOptionIndex();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(
                        selectedValues[selectedValues.length - 1]?.value
                      );
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options>
            {data
              ?.filter((item) =>
                item.label.toLowerCase().includes(search.trim().toLowerCase())
              )
              .map((item) => (
                <Combobox.Option
                  value={item.value}
                  key={item.value}
                  active={selectedValues.some((v) => v.value === item.value)}
                >
                  <Group gap="sm">
                    {selectedValues.some((v) => v.value === item.value) && (
                      <CheckIcon size={12} />
                    )}
                    <span>{item.label}</span>
                  </Group>
                </Combobox.Option>
              ))}
            {!exactMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}
            {exactMatch && search.trim().length > 0 && (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
            {data?.length === 0 && <Combobox.Empty>No Data</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};
