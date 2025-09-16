import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { appColors } from '@/theme/colors';
import styled from '@emotion/styled';
interface IFrameOneProps {
  activeColor?: string;
  padding?: string;
}
export const ButtonFrame = styled.div<{ color?: string }>`
  background: ${({ color }) => (color ? `${color}` : '#ffffff')};
  display: flex;
  width: fit-content;
  border-radius: 23px;
  padding: 4px;
`;

export const FrameOne = styled.div<IFrameOneProps>`
  border-radius: 23px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  line-height: 17px;
  text-align: center;
  padding: ${({ padding }) => padding || '4px 25px'};
  color: #051438;
  cursor: pointer;
  &.active {
    background: ${({ activeColor }) =>
      activeColor ? `${activeColor}` : '#dfe2e9'};
  }
  @media (max-width: 40em) {
    padding: 7px 12px;
  }
`;

type TabSwitcherProps = {
  data: {
    name: string;
    key: number | string;
  }[];
  color?: string;
  callBackFunc?: (value: string) => void;
  activeColor?: string;
  padding?: string;
  textColor?: string;
  defaultNumber?: number;
  callBackForKeyField?: (v: string | number) => void;
  defaultValue?: string;
};

const TabSwitcher = ({
  data,
  color,
  callBackFunc,
  callBackForKeyField,
  activeColor,
  padding,
  defaultNumber = 0,
  textColor = appColors.black,
  defaultValue,
}: TabSwitcherProps) => {
  const [activeTab, setActiveTab] = useState(data?.[defaultNumber]?.name);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTablePanelSwitcher = (
    value: string,
    keyField: string | number
  ) => {
    setActiveTab(value);
    callBackFunc?.(value);
    callBackForKeyField?.(keyField);
  };

  const handleScrollVisibility = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollWidth, scrollLeft, clientWidth } = container;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      setShowRightButton(!isAtEnd);
      setShowLeftButton(!isAtStart);
    }
  };
  useEffect(() => {
    const duration =
      defaultValue === 'monthlyPrice'
        ? 'Monthly'
        : defaultValue === 'biannualPrice'
        ? 'Biannually'
        : 'Annually';
    handleTablePanelSwitcher(duration, duration);
  }, [defaultValue]);
  useEffect(() => {
    tabRef.current?.click();
    handleScrollVisibility();
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === 'right' ? 100 : -100;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Flex align="center">
      {showLeftButton && (
        <Flex
          p={5}
          align="center"
          justify={'center'}
          onClick={() => scrollTabs('left')}
          sx={{
            height: '28px',
            width: '28px',
            borderRadius: '50%',
            border: `1px solid ${appColors.grayLight}`,
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'block',
            },
          }}
        >
          <IconArrowLeft
            style={{ display: 'flex', alignSelf: 'center' }}
            size={16}
          />
        </Flex>
      )}

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          overflowX: 'scroll',
          maxWidth: '100%',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
        onScroll={handleScrollVisibility}
      >
        <ButtonFrame color={color}>
          {data.map((value, i) => (
            <FrameOne
              data-testid={`tab-${value.name.replace(/\s/g, '_')}`}
              key={value.key}
              ref={i === 0 ? tabRef : null}
              className={activeTab === value.name ? 'active' : 'not-active'}
              activeColor={activeColor}
              onClick={() => handleTablePanelSwitcher(value.name, value.key)}
              style={{
                color: activeTab === value.name ? textColor : appColors.black,
              }}
              padding={padding}
            >
              {value.name}
            </FrameOne>
          ))}
        </ButtonFrame>
      </Box>

      {showRightButton && (
        <Box
          sx={{
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'block',
            },
          }}
        >
          <Flex
            align="center"
            justify={'center'}
            onClick={() => scrollTabs('right')}
            sx={{
              minHeight: '28px',
              minWidth: '28px',
              borderRadius: '50%',
              border: `1px solid ${appColors.grayLight}`,
            }}
          >
            <IconArrowRight
              style={{ display: 'flex', alignSelf: 'center' }}
              size={16}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default TabSwitcher;
