/* eslint-disable @next/next/no-img-element */
'use cient';
import { Carousel } from '@mantine/carousel';
import { Center, Flex, Space, Stack, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import analytics from '../../../../../assets/analytics.webp';
import ehr from '../../../../../assets/emr.webp';
import doctor from '../../../../../assets/doctor.webp';
import classes from './LoginSlider.module.css';
import { appColors } from '@/theme/colors';

const assets = [
  {
    title: 'Patient Records Overview',
    subText:
      'Access patient visits, prescriptions, and lab results in one place — filter by clinic or date to track health outcomes efficiently.',
    image: analytics,
    id: 1,
  },
  {
    title: 'Clinical Workflow Insights',
    subText:
      'Monitor appointments, diagnoses, and treatment progress — identify bottlenecks and improve care delivery across departments.',
    image: ehr,
    id: 2,
  },
  {
    title: 'Prescription & Medication Tracking',
    subText:
      'Stay on top of prescribed medications, dosage adherence, and refill status — ensure continuity of care for every patient.',
    image: doctor,
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
                  style={{ width: '70%', height: 'auto', borderRadius: '1rem', }}
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
