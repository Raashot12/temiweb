'use client';
import { useState, forwardRef } from 'react';
import {
  Badge,
  Title,
  Text,
  useMantineTheme,
  Flex,
  Group,
  Menu,
  Tabs,
  Drawer,
  Box,
  ScrollArea,
  rem,
  Divider,
  Burger,
  Button,
  Stack,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { appColors } from '@/theme/colors';
import { usePathname, useRouter } from 'next/navigation';
import classes from './DashboardHeader.module.css';
import { logOut } from '@/state/features/auth/authSlice';
import { FaUser } from 'react-icons/fa';
import { useAppDispatch } from '@/state/hooks';
import IconUserGrayBg from '@/components/shared/IconComponents/IconUserGrayBg';
import IconMenuLogo from '@/components/shared/IconComponents/MenuIcons/IconMenuLogo';
import IconPluralHealth from '@/components/shared/IconComponents/IconPluralHealth';
import IconMenuDivider from '@/components/shared/IconComponents/MenuIcons/IconMenuDivider';
import IconMenuDashboardActive from '@/components/shared/IconComponents/MenuIcons/IconMenuDashboardActive';
import IconNotificationBell from '@/components/shared/IconComponents/IconNotificationBell';
import IconMenuAnalytics from '@/components/shared/IconComponents/MenuIcons/IconMenuAnalytics';
import IconMenuAnalyticsActive from '@/components/shared/IconComponents/MenuIcons/IconMenuAnalyticsActive';
import IconMenuDashboard from '@/components/shared/IconComponents/MenuIcons/IconMenuDashboard';
import IconProfile from '@/components/shared/IconComponents/MenuIcons/IconProfile';
import IconSwitchRole from '@/components/shared/IconComponents/MenuIcons/IconSwitchRole';
import IconSwitchAll from '@/components/shared/IconComponents/MenuIcons/IconSwitchAll';
import IconHospital from '@/components/shared/IconComponents/MenuIcons/IconHospital';
import IconSaleHistory from '@/components/shared/IconComponents/MenuIcons/IconSaleHistory';
import IconInventoryManagement from '@/components/shared/IconComponents/MenuIcons/IconInventoryManagement';
import IconSettings from '@/components/shared/IconComponents/MenuIcons/IconSettings';
import IconEmergencyLeave from '@/components/shared/IconComponents/MenuIcons/IconEmergencyLeave';
import IconLogout from '@/components/shared/IconComponents/MenuIcons/IconLogout';
import PlateauMedMainLogo from '@/components/shared/IconComponents/PlateauMedMainLogo';
import { FaCalendarCheck } from "react-icons/fa";

const ProfileMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <Menu width={320} position="bottom-end">
      <Menu.Target>
        <Button className={classes.avatarButton}>
          <IconUserGrayBg />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuHeader fullName={'Kayode Emmanuel'} role={'Front desk'} />
        <Stack gap={8} mt={14}>
          <Menu.Item leftSection={<IconProfile />}>
            <Text fw={500}>Messages</Text>
          </Menu.Item>
          <Menu.Item leftSection={<IconSwitchRole />}>
            <Text fw={500}>Switch Role</Text>
          </Menu.Item>
          <Menu.Item leftSection={<IconSwitchAll />}>
            <Text fw={500}>Switch outlet (All)</Text>
          </Menu.Item>
          <Menu.Item leftSection={<IconHospital />}>
            <Text fw={500}>Connected hospitals</Text>
          </Menu.Item>
          <Menu.Item leftSection={<IconSaleHistory />}>
            <Text fw={500}>Sale history</Text>
          </Menu.Item>
          <Menu.Item leftSection={<IconInventoryManagement />}>
            <Text fw={500}>Inventory management</Text>
          </Menu.Item>
          <Menu.Item leftSection={<IconSettings />}>
            <Text fw={500}>Settings</Text>
          </Menu.Item>
          <Menu.Item leftSection={<IconEmergencyLeave />}>
            <Text fw={500} c={appColors.orangeDeep}>
              Emergency leave
            </Text>
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLogout />}
            onClick={() => {
              dispatch(logOut());
              router.push('/login');
            }}
            c={appColors.red}
          >
            <Text fw={500}>Sign out</Text>
          </Menu.Item>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};

const MenuHeader = ({ fullName, role }: { fullName: string; role: string }) => {
  return (
    <div className={classes.menuHeaderWrapper}>
      <div>
        <IconUserGrayBg />
      </div>
      <div className={classes.menuUserWrapper}>
        <div className={classes.menuUserFullName}>{fullName}</div>
        <div className={classes.menuUserRole}>{role}</div>
      </div>
      <div className={classes.accountTypeBadge}>
        <Badge
          style={{
            color: '#677597',
            backgroundColor: '#EFF1F4',
            textTransform: 'capitalize',
          }}
        >
          Primary
        </Badge>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const SwitchRoleButton = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => (
  <div ref={ref} {...props}>
    Switch Role
  </div>
));

const DashboardHeader = ({ noNavLinks = false }: { noNavLinks?: boolean }) => {
  const theme = useMantineTheme();
  const matchMedium = useMediaQuery(`(max-width: 73.75em`);
  const matchSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const pathname = usePathname();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(pathname.slice(1));
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      {!matchMedium ? (
        <header style={{ height: '50px' }}>
          <div className={classes.appHeaderWrapper}>
            <Group gap={24} justify="space-between">
              <div className={classes.brandWrapper}>
                <Box ml={8}>
                  <Box>
                    <Flex direction="column">
                      <Box>
                        <PlateauMedMainLogo size={50} />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </div>
              <IconMenuDivider />
            </Group>
            {(!matchSmall || noNavLinks) && (
              <Group gap={0} justify="center" flex={1}>
                <Tabs
                  variant="unstyled"
                  defaultValue="dashboard"
                  className={classes.tab}
                  onChange={(value) => {
                    setActiveTab(value);
                    router.push(`/${value}`);
                  }}
                >
                  <Tabs.List grow>
                    <Tabs.Tab
                      value="receiptionist"
                      leftSection={
                        activeTab === 'receiptionist' ? (
                          <FaUser size={20} color="#3E8BCF" />
                        ) : (
                          <FaUser size={20} color={appColors.subText}/>
                        )
                      }
                      style={{ padding: '8px' }}
                    >
                      <Text
                        fz={16}
                        className={classes.menuText}
                        c={
                          activeTab === 'receiptionist'
                            ? '#3E8BCF'
                            : appColors.subText
                        }
                        fw={600}
                      >
                        Home
                      </Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="book-appointment"
                      leftSection={
                        activeTab === 'book-appointment' ? (
                          <FaCalendarCheck size={20} color="#3E8BCF" />
                        ) : (
                          <FaCalendarCheck size={20} color={appColors.subText} />
                        )
                      }
                      style={{ padding: '8px' }}
                    >
                      <Text
                        className={classes.menuText}
                        c={
                          activeTab === 'book-appointment'
                            ? '#3E8BCF'
                            : appColors.subText
                        }
                        fw={600}
                        fz={16}
                      >
                        Book Appointment
                      </Text>
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Group>
            )}
            {!matchSmall && (
              <div className={classes.headerUserWrapper}>
                <div className={classes.salutationWrapper}>
                  <Title order={3}>Hi Mr Kayode</Title>
                </div>
                <Flex>
                  <IconNotificationBell />
                </Flex>
                <div className={classes.avatarWrapper}>
                  <ProfileMenu />
                </div>
              </div>
            )}
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </div>
        </header>
      ) : (
        <header>
          <div className={classes.appHeaderWrapper}>
            <Flex direction={'column'} align={'center'} w={'100%'}>
              <Flex justify={'space-between'} w={'100%'} align={'center'}>
                <div className={classes.brandWrapper}>
                  <Flex gap={8}>
                    <IconMenuLogo />
                    <Text fz={'18px'} fw={'700'}>
                      Clearline HMO
                    </Text>
                  </Flex>
                  <Box ml={8}>
                    <Box>
                      <Flex direction="column">
                        <Text fz="0.625rem" fw={500} color="#7A90C2">
                          powered by
                        </Text>
                        <Box>
                          <IconPluralHealth />
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                </div>
                <>
                  {!matchSmall && (
                    <div className={classes.headerUserWrapper}>
                      <div className={classes.salutationWrapper}>
                        <Title order={3}>Hi Mr Kayode</Title>
                      </div>
                      <Flex>
                        <IconNotificationBell />
                      </Flex>
                      <div className={classes.avatarWrapper}>
                        <ProfileMenu />
                      </div>
                    </div>
                  )}
                </>
              </Flex>
              <Group gap={24}>
                {!matchSmall && (
                  <Group gap={0}>
                    <Tabs
                      variant="unstyled"
                      defaultValue="dashboard"
                      className={classes.tab}
                      onChange={(value) => {
                        setActiveTab(value);
                        router.push(`/${value}`);
                      }}
                    >
                      <Tabs.List grow>
                        <Tabs.Tab
                          value="analytics"
                          leftSection={
                            activeTab === 'analytics' ? (
                              <IconMenuAnalyticsActive />
                            ) : (
                              <IconMenuAnalytics />
                            )
                          }
                          style={{ padding: '8px' }}
                        >
                          <Text
                            className={classes.menuText}
                            c={
                              activeTab === 'analytics'
                                ? appColors.blue
                                : appColors.subText
                            }
                          >
                            Analytics
                          </Text>
                        </Tabs.Tab>
                        <Tabs.Tab
                          value="dashboard"
                          leftSection={
                            activeTab === 'dashboard' ? (
                              <IconMenuDashboardActive />
                            ) : (
                              <IconMenuDashboard />
                            )
                          }
                          style={{ padding: '8px' }}
                        >
                          <Text
                            className={classes.menuText}
                            c={
                              activeTab === 'dashboard'
                                ? appColors.blue
                                : appColors.subText
                            }
                          >
                            POS Dashboard
                          </Text>
                        </Tabs.Tab>
                      </Tabs.List>
                    </Tabs>
                  </Group>
                )}
              </Group>
            </Flex>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </div>
        </header>
      )}

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<MenuHeader fullName={'Kayode Emmanuel'} role={'Front desk'} />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Group gap={0} ml={20}>
            <Tabs
              variant="unstyled"
              orientation="vertical"
              defaultValue="dashboard"
              className={classes.tab}
              onChange={(value) => {
                setActiveTab(value);
                router.push(`/${value}`);
              }}
            >
              <Tabs.List grow>
                <Tabs.Tab
                  value="analytics"
                  leftSection={
                    activeTab === 'analytics' ? (
                      <IconMenuAnalyticsActive />
                    ) : (
                      <IconMenuAnalytics />
                    )
                  }
                  style={{ padding: '8px' }}
                >
                  <Text
                    className={classes.menuText}
                    c={
                      activeTab === 'analytics'
                        ? appColors.blue
                        : appColors.subText
                    }
                  >
                    Analytics
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab
                  value="dashboard"
                  leftSection={
                    activeTab === 'dashboard' ? (
                      <IconMenuDashboardActive />
                    ) : (
                      <IconMenuDashboard />
                    )
                  }
                  style={{ padding: '8px' }}
                >
                  <Text
                    className={classes.menuText}
                    c={
                      activeTab === 'dashboard'
                        ? appColors.blue
                        : appColors.subText
                    }
                  >
                    POS Dashboard
                  </Text>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>
          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default DashboardHeader;
