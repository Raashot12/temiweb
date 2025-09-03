"use client";
import { AppShell, Box, useMantineTheme } from "@mantine/core";
import DashboardHeader from "./DashboardHeader";
import { useMediaQuery } from "@mantine/hooks";
import HeadTitle from "./HeadTitle";
import classes from "./Dashboard.module.css";

type DashboardProps = {
  children: React.ReactNode;
  title?: string;
};

const Dashboard = ({ children, title = "" }: DashboardProps) => {
  const theme = useMantineTheme();
  const matchMedium = useMediaQuery(`(max-width: 73.75em`);
  const matchSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <AppShell
      classNames={{
        root: classes.root,
        main: classes.main,
        header: classes.header,
      }}
      header={{ height: !matchMedium ? 50 : matchSmall ? 50 : 75 }}
    >
      <AppShell.Header>
        <DashboardHeader />
      </AppShell.Header>

      <AppShell.Main>
        <HeadTitle title={`PlateauMed - ${title}`} />
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
