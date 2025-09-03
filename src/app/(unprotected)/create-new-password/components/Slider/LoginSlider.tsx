/* eslint-disable @next/next/no-img-element */
'use cient';
import { Carousel } from '@mantine/carousel';
import { Center, Flex, Space, Stack, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import analytics from '../../../../../assets/analytics.webp';
import classes from './LoginSlider.module.css';
import { appColors } from '@/theme/colors';

const assets = [
  {
    title: 'Live Store Overview',
    subText:
      'See sales, prescriptions, and stock health at a glance — filter by outlet or date to spot trends and revenue gaps.',
    image: analytics,
    id: 1,
  },
  {
    title: 'Live Store Overview',
    subText:
      'See sales, prescriptions, and stock health at a glance — filter by outlet or date to spot trends and revenue gaps.',
    image: analytics,
    id: 2,
  },
  {
    title: 'Live Store Overview',
    subText:
      'See sales, prescriptions, and stock health at a glance — filter by outlet or date to spot trends and revenue gaps.',
    image: analytics,
    id: 3,
  },
];

const LoginSlider = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Carousel
      mx="auto"
      maw={'100%'}
      loop
      withIndicators
      height={'100vh'}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      classNames={classes}
    >
      {assets.map((item) => {
        return (
          <Carousel.Slide key={item.id}>
            <Flex align={'center'} direction={'column'}gap={20} justify={'center'} h={'100%'} pb="1rem" px={20} pt={80}>
              <Center>
                <img
                  src={item.image.src}
                  alt="Analytics"
                  style={{ width: '70%', height: 'auto' }}
                />
              </Center>
              <Stack gap={10}>
                <Text fz="2rem" fw={700} c={appColors?.white} ta={'center'}>
                  {item.title}
                </Text>
                <Text
                  fz="1rem"
                  c={appColors?.blackAccent}
                  fw={500}
                  ta={'center'}
                >
                  {item.subText}
                </Text>
              </Stack>
            </Flex>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};
export default LoginSlider;
