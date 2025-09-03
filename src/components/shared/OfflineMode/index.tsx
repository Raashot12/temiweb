"use client";

import { Stack, Text, Divider, Group } from "@mantine/core";
import { ReactNode } from "react";
import { ExclamationFilledCircleIcon } from "../IconComponents/ExclamationFilledCircleIcon";
import IconNoWifi from "../IconComponents/IconNoWifi";
import { appColors } from "@/theme/colors";


interface OfflineModeProps {
  title?: string;
  subtitle?: string;
  warningMessage?: string;
  customIcon?: ReactNode;
}

export default function OfflineMode({
  title = "Offline mode",
  subtitle = "Login is unavailable at the moment.",
  warningMessage = "Connect to the internet to log in.",
  customIcon,
}: OfflineModeProps) {
  return (
    <Stack align="center">
      <Text fz="1.5rem" fw={700} ta="center">
        {title}
      </Text>

      <Stack
        style={{
          background: appColors?.white,
          border: `1px solid ${appColors?.fadeGray}`,
          padding: "12px",
          gap: "12px",
          borderRadius: "10px",
          minWidth: "28rem",
        }}
      >
        <Divider
          label={
            <Group gap={8}>
              {customIcon ?? <IconNoWifi fill={appColors?.deepBlack} />}
              <Text fz={16} fw={600} c={appColors?.deepBlack}>
                You are currently offline
              </Text>
            </Group>
          }
          labelPosition="left"
        />

        <Text fz={14} fw={500} c={appColors?.greenFade}>
          {subtitle}
        </Text>

        <Group
          style={{
            background: appColors?.yellowFadedAccent,
            borderRadius: "8px",
            padding: "8px 12px",
            gap: "8px",
          }}
        >
          <ExclamationFilledCircleIcon fill={appColors?.yellowDeep} />
          <Text fz={14} fw={500} c={appColors?.yellowDeep}>
            {warningMessage}
          </Text>
        </Group>
      </Stack>
    </Stack>
  );
}
