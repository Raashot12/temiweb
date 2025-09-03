import { AppShell, Box, ScrollArea, rem } from '@mantine/core';
import OnboardingHeader from './OnboardingHeader';
import HeadTitle from '../Dashboard/HeadTitle';
import { useDisclosure } from '@mantine/hooks';
import { NavbarType } from '@/types/index';
import OnboardingNavbar from './OnboardingNavbar';
import { appColors } from '@/theme/colors';

type OnboardingShellProps = {
  children: React.ReactNode;
  title?: string;
  first?: boolean;
  btnText?: string;
  last?: boolean;
  handleContinue?: () => void;
  handlePrevious?: () => void;
  handleTrialSubscription?: () => void;
  handleNext?: () => void;
  isLoading?: boolean;
  tryTrialBtnText?: string;
  displayNoButton?: boolean;
  isTrial?: boolean;
  isRequired?: boolean;
  updateOnboardingStatus?: NavbarType[];
};

const OnboardingShell = ({ children, title = '' }: OnboardingShellProps) => {
  const [opened] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: 56 }}
        navbar={{
          width: 321,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding={0}
      >
        <AppShell.Header h={rem(44)}>
          <OnboardingHeader />
        </AppShell.Header>
        <AppShell.Navbar>
          <OnboardingNavbar />
        </AppShell.Navbar>
        <AppShell.Main style={{ backgroundColor: appColors.pageBackground }}>
          <HeadTitle title={`PlateauMed Onboarding - ${title}`} />
          <Box style={{ padding: '24px' }}>{children}</Box>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default OnboardingShell;
