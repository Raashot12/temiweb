import { AppShell, MantineTheme, rem, useMantineTheme,  } from '@mantine/core';
import SignupHeader from './SignupHeader';
import { appColors } from '@/theme/colors';
import HeadTitle from '@/layouts/Dashboard/HeadTitle';

type DashboardProps = {
  children: React.ReactNode;
  title?: string;
};

const useStyles = (theme: MantineTheme) => ({
  root: {
    paddingBottom: `20px`,
    backgroundColor: appColors.pageBackground,
    position: 'relative' as const,
    height: '100%',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      padding: `0 ${rem(8)}`,
    },

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: 0,
    },
  },

  main: {
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
});

const SignUpWrapperShell = ({ children, title = '' }: DashboardProps) => {
  const theme = useMantineTheme();
  const styles = useStyles(theme);

  return (
    <AppShell
      styles={{ root: styles.root, main: styles.main }}
      header={{ height: 40 }}
    >
      <AppShell.Header>
        <SignupHeader />
      </AppShell.Header>
      <AppShell.Main style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <HeadTitle title={`Plural - ${title}`} />
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default SignUpWrapperShell;
