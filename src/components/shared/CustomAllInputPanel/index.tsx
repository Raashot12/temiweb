import { Box, Collapse, Flex, Text } from '@mantine/core';
import React, { useState } from 'react';
import IconUpSmall from '../IconComponents/IconUpSmall';
import TabSwitcher from '../TabSwitcher';

const CustomStyles = {
  label: {
    fontWeight: 700,
    fontSize: 18,
    cursor: 'pointer',
  },
  labelTextGray: {
    fontWeight: 600,
    fontSize: 18,
    color: '#A6AFC2',
    cursor: 'pointer',
  },
  placeholderText: {
    fontWeight: 700,
    color: '#051438',
  },
};

const CustomOptionSelect = (props: {
  children: React.ReactElement | React.ReactElement[];
  title: string;
  subtitle?: string;
  labelColored?: boolean;
  showSubtitle?: boolean;
  showTabPanel?: boolean;
  showPostTabPanel?: boolean;
  placeholder?: string;
  isVitalSign?: boolean;
  strappedText: string;
  tabName: string;
  expand?: boolean;
  onExpand?: VoidFunction;
  isLeftPanel?: boolean;
  isRightPanel?: boolean;
}) => {
  const {
    children,
    title,
    subtitle,
    showSubtitle,
    labelColored,
    showTabPanel,
    showPostTabPanel,
    strappedText,
    expand,
    onExpand,
    isLeftPanel,
    isRightPanel,
    ...rest
  } = props;
  const [activeTab, setActiveTab] = useState('Use suggestions');
  const [activePostTab, setActivePostTab] = useState('Preop');
  const [showPanelType, setShowPanel] = useState('Miscellaneous Interventions');
  const [opened, setOpened] = useState(false);

  const handleRightTablePanel = (value: string) => {
    setActiveTab(value);
  };

  const handleTabChange = (value: string) => {
    setShowPanel(value);
  };
  const someData = {
    toogleclose: () => setOpened(false),
    activeSelectedTab: activeTab,
    setActiveTabChange: setActiveTab,
    activePostSelectedTab: activePostTab,
    setActivePostTabChange: setActivePostTab,
    switchcomponent: showPanelType,
  };
  const childrenWithProps = React.Children.map(children, (child) => {
    const validProps = { ...child.props };
    delete validProps.toogleclose;
    return React.cloneElement(child, { data: someData });
  });

  const isControlled = typeof expand === 'boolean';

  return (
    <Box sx={{ position: 'relative' }} {...rest}>
      <Flex
        justify={'space-between'}
        mb={showTabPanel ? 10 : 16}
        style={{
          flexShrink: 0,
          '@media (max-width: 576px)': {
            overflowX: 'scroll',
          },
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        columnGap={24}
      >
        <Flex align={'center'} columnGap={24}>
          <Text
            style={{
              whiteSpace: 'nowrap',
              color: `${
                labelColored && showPanelType === 'Miscellaneous Interventions'
                  ? '#0B0C7D'
                  : '#051438'
              }`,
              fontWeight: 700,
              fontSize: 18,
              cursor: 'pointer',
            }}
            onClick={
              title === 'Miscellaneous Interventions'
                ? () => handleTabChange('Miscellaneous Interventions')
                : () => null
            }
          >
            {title}
          </Text>
          {showSubtitle && (
            <Text
              data-testid={'nursing-care-plan-tab'}
              style={{
                color: `${
                  showPanelType === 'Nursing care plan' ? '#0B0C7D' : '#A6AFC2'
                }`,
                whiteSpace: 'nowrap',
                fontWeight: 600,
                fontSize: 18,
                cursor: 'pointer',
              }}
              onClick={() => handleTabChange('Nursing care plan')}
            >
              {subtitle}
            </Text>
          )}
        </Flex>
        {showTabPanel && (
          <>
            <TabSwitcher
              data={[
                { name: 'Use suggestions', key: 1 },
                { name: 'Type notes', key: 2 },
              ]}
              color="#ffff"
              callBackFunc={handleRightTablePanel}
            />
          </>
        )}
        {showPostTabPanel && (
          <>
            <TabSwitcher
              data={[
                { name: 'Preop', key: 1 },
                { name: 'Intraop', key: 2 },
                { name: 'Postop', key: 3 },
              ]}
              color="#ffff"
              callBackFunc={() => null}
            />
          </>
        )}
      </Flex>
      <Box>
        <Box>
          {(isControlled ? !expand : !opened) && (
            <Flex
              data-testid={'collapse-container'}
              data-cy={'collapse-container'}
              align={'center'}
              onClick={() => (isControlled ? onExpand?.() : setOpened(true))}
              bg={'white'}
              justify={'space-between'}
              style={{ borderRadius: 10, cursor: 'pointer' }}
              px={20}
              py={16}
            >
              <Text style={CustomStyles.placeholderText}>{strappedText}</Text>

              <IconUpSmall
                onclick={() => (isControlled ? onExpand?.() : setOpened(true))}
              />
            </Flex>
          )}
        </Box>
      </Box>
      {(isControlled ? expand : opened) && (
        <Collapse in={true}>
          <Box sx={{ width: '100%', zIndex: 2 }}>{childrenWithProps}</Box>
        </Collapse>
      )}
    </Box>
  );
};

export default CustomOptionSelect;
