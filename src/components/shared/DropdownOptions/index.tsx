
import { ActionIcon, Menu } from '@mantine/core';
import { IconThreeDots } from '../IconComponents/IconThreeDots';

type ListOption = {
  label: string;
  onClick: () => void;
};

type DropdownOptionsProps<T> = {
  options: ListOption[];
};

export const DropdownOptions = <T,>({ options }: DropdownOptionsProps<T>) => {
  return (
    <>
      <Menu width={200} shadow="md">
        <Menu.Target>
          <ActionIcon bg="white">
            <IconThreeDots color="black" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {options.map((option) => (
            <Menu.Item fw={500} key={option.label} onClick={option.onClick}>
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
