import { Flex, Box, Text, ScrollArea, ActionIcon } from '@mantine/core';
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import PillStick from '../PillStick';
import IconChevronRight from '../IconComponents/IconChevronRight';

export type RecordPill = {
  id: number;
  name: string;
  specimen: string | null;
  specificOrganism: string | null;
  requestId: number | null;
};

type TabPanelProps = {
  activeTab?: string;
  tabPanel?: Array<{ id: string; name: string; isAvailable: boolean }>;
  scrollable: boolean;
  handleTabChange: (value: string) => void;
  buttonElement?: boolean;
  spacing?: number;
  padding?: string;
  color?: string;
  textcolor?: string;
  isLaboratoryRoute?: boolean | undefined;
  itemIndex?: number;
  setSelectedInvestigationDetails?: Dispatch<SetStateAction<RecordPill | null>>;
  setSelectedValue?: Dispatch<SetStateAction<string>>;
};

const TabPanel = ({
  tabPanel,
  scrollable,
  spacing = 16,
  activeTab,
  handleTabChange,
  buttonElement,
  padding = '2px 29px',
  color,
  textcolor,
  isLaboratoryRoute,
  itemIndex,
  setSelectedInvestigationDetails,
  setSelectedValue,
}: TabPanelProps) => {
  const [active, setActive] = React.useState(0);
  const contentWrapper: RefObject<HTMLDivElement> = useRef(null);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const sideScroll = (
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number,
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      setScrollLeft(element.scrollLeft);
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const isActive = (activeTabId: number) => activeTabId === active;

  const handleClick = (activeList: number) => {
    setActive(activeList);
  };

  const ResetKey = () => {
    setSelectedInvestigationDetails?.(null);
    setSelectedValue?.('');
  };

  useEffect(() => {
    handleClick(itemIndex as number);
  }, [itemIndex]);

  return (
    <Box pos="relative">
      <ScrollArea
        viewportRef={contentWrapper}
        // style={{
        //   padding,
        // }}
        scrollbarSize={0}
      >
        <Flex align="center" gap={buttonElement ? 12 : spacing} mt={18}>
          {tabPanel &&
            tabPanel.map((tabItem, index) => {
              const isCurrentActive = !activeTab
                ? isActive(index)
                : activeTab ===
                  (typeof tabItem === 'string' ? tabItem : tabItem.id);

              return (
                <Flex align="center" gap="xs" key={index}>
                  {buttonElement ? (
                    <PillStick
                      data-testid={`tab-${(typeof tabItem === 'string'
                        ? tabItem
                        : tabItem.id
                      ).replace(/\s/g, '_')}`}
                      title={
                        typeof tabItem === 'string' ? tabItem : tabItem.name
                      }
                      buttonElement={buttonElement}
                      onclick={() => {
                        handleClick(index);
                        ResetKey();
                        handleTabChange(
                          typeof tabItem === 'string' ? tabItem : tabItem.id,
                        );
                      }}
                      active={isCurrentActive}
                      spacing={0}
                      color={color}
                      textcolor={textcolor}
                    />
                  ) : (
                    <Text
                      data-testid={`tab-${(typeof tabItem === 'string'
                        ? tabItem
                        : tabItem.id
                      ).replace(/\s/g, '_')}`}
                      fw={700}
                      fz="sm"
                      style={{
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        color: isCurrentActive ? '#0B0C7D' : '#A6AFC2',
                      }}
                      onClick={() => {
                        handleClick(index);
                        ResetKey();
                        handleTabChange(
                          typeof tabItem === 'string' ? tabItem : tabItem.id,
                        );
                      }}
                    >
                      {typeof tabItem === 'string' ? tabItem : tabItem.name}
                    </Text>
                  )}
                </Flex>
              );
            })}
        </Flex>
      </ScrollArea>

      {!isLaboratoryRoute && scrollable && (
        <>
          {/* Right Chevron */}
          <ActionIcon
            variant="white"
            radius="xl"
            size="md"
            pos="absolute"
            right={0}
            top={buttonElement ? 3 : -2}
            onClick={() => {
              if (contentWrapper.current) {
                sideScroll(contentWrapper.current, 25, 100, 10);
              }
            }}
          >
            <IconChevronRight />
          </ActionIcon>

          {/* Left Chevron */}
          {scrollLeft > 0 && (
            <ActionIcon
              variant="white"
              radius="xl"
              size="md"
              bg="#fffff"
              pos="absolute"
              left={0}
              top={buttonElement ? 3 : -2}
              onClick={() => {
                if (contentWrapper.current) {
                  sideScroll(contentWrapper.current, 25, 100, -10);
                }
              }}
            >
              <IconChevronRight style={{ transform: 'rotate(180deg)' }} />
            </ActionIcon>
          )}
        </>
      )}
    </Box>
  );
};

export default TabPanel;
