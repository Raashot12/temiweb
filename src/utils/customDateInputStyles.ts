import { appColors } from "@/theme/colors";
import { MantineTheme } from "@mantine/core";

export const customDateInputStlyes = (theme: MantineTheme) => ({
  cell: {
    border: `1px solid ${
      theme.white === "light" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  calendar: {
    background: `${appColors.text}`,
  },
  error: { color: appColors.red },
  input: {
    "&[data-invalid]": {
      color: appColors.red,
      borderColor: appColors.red,

      "&::placeholder": {
        color: appColors.red,
      },
    },
  },
  day: {
    height: 25,
    width: 35,
    fontSize: theme.fontSizes.md,
    color: `${appColors.fade}`,
    fontWeight: 600,
    ":hover": {
      backgroundColor: `${appColors.subText}`,
    },
    ":active": {
      backgroundColor: `${appColors.subText}`,
    },
  },
  weekday: {
    fontSize: theme.fontSizes.md,
    color: "black",
    fontWeight: 700,
  },
  weekdayCell: {
    fontSize: theme.fontSizes.xl,
    backgroundColor:
      theme.white === "light" ? theme.colors.dark[5] : theme.colors.gray[0],
    border: `1px solid ${
      theme.white === "light" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
    height: 25,
  },
  weekend: {
    color: "blue",
  },
  calendarHeaderControl: {
    color: `${appColors.fade}`,
    ":hover": {
      backgroundColor: `${appColors.subText}`,
    },
  },
  calendarHeader: {
    maxWidth: "100%",
    margin: "0 auto",
  },
  calendarHeaderLevel: {
    color: `${appColors.fade}`,
    fontWeight: 700,
    fontSize: "18px",
    ":hover": {
      backgroundColor: `${appColors.subText}`,
    },
  },
});
