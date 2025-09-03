import React from "react";
import { Menu, Button, MenuItemProps, ButtonVariant } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

type DropdownButtonProps = {
  buttonText: string;
  menuItems: { label: string; onClick: () => void }[];
  buttonStyles?: React.CSSProperties;
  buttonVariant?: ButtonVariant;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttonText,
  menuItems,
  buttonStyles,
  buttonVariant,
}) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          style={{
            fontSize: "16px",
            fontWeight: "600",
            height: "40px",
            ...buttonStyles,
          }}
          rightSection={<IconChevronDown size={16} />}
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {menuItems.map((item, index) => (
          <Menu.Item
            key={index}
            onClick={item.onClick}
            fw={500}
            px={10}
            styles={{
              itemLabel: {
                whiteSpace: "nowrap",
              },
            }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default DropdownButton;
