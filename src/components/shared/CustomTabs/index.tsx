import React, { ReactNode } from "react";
import { Tabs as MTabs, rem } from "@mantine/core";
import styles from "./tabs.module.css";

type TabItem<T extends string> = {
  value: T;
  label: string;
  icon?: JSX.Element;
  content?: ReactNode;
};

type TabsProps<T extends string> = {
  defaultTab: T;
  tabs: readonly TabItem<T>[];
  onChange: (value: T) => void;
};

export const Tabs = <T extends string>({
  defaultTab,
  tabs,
  onChange,
}: TabsProps<T>) => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <MTabs
      defaultValue={defaultTab}
      classNames={styles}
      onChange={(value) => onChange(value as T)}
    >
      <MTabs.List>
        {tabs.map((tab) => (
          <MTabs.Tab
            fw={600}
            key={tab.value}
            value={tab.value}
            leftSection={
              tab.icon
                ? React.cloneElement(tab.icon, { style: iconStyle })
                : undefined
            }
          >
            {tab.label}
          </MTabs.Tab>
        ))}
      </MTabs.List>

      {tabs.map((tab) => (
        <MTabs.Panel key={tab.value} value={tab.value}>
          {tab.content}
        </MTabs.Panel>
      ))}
    </MTabs>
  );
};
