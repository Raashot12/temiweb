import { useState, useEffect } from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { momentBrowserTimezone } from '@/utils/utils';
import PlateauMedMainLogo from '@/components/shared/IconComponents/PlateauMedMainLogo';
import { signupStyles } from './Signup.styles';

const DashboardHeader = () => {
  const [currentDateTime, setCurrentDateTime] = useState(
    momentBrowserTimezone(),
  );
  const theme = useMantineTheme();
  const matchMedium = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const matchSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(momentBrowserTimezone());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box style={signupStyles.headerRoot} h={44}>
      <Box style={signupStyles.appHeaderWrapper}>
        <Box>
          <PlateauMedMainLogo full={!matchSmall} height={30} />
        </Box>
        <Box style={signupStyles.dateTimeWrapper}>
          <Box style={signupStyles.dateWrapper}>
            {matchMedium
              ? currentDateTime.format('D MMM')
              : currentDateTime.format('D MMMM')}
          </Box>
          <Box style={signupStyles.timeWrapper}>
            {currentDateTime.format('hh:mm A')}
          </Box>
        </Box>
        {!matchSmall && (
          <Box style={{ visibility: 'hidden' }}>
            <Box style={signupStyles.dateWrapper}>
              {matchMedium
                ? currentDateTime.format('D MMM')
                : currentDateTime.format('D MMMM')}
            </Box>
            <Box>{currentDateTime.format('hh:mm A')}</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashboardHeader;
