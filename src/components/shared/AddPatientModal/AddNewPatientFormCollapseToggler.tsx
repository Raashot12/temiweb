import { appColors } from '@/theme/colors';
import { Collapse, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import IconArrowUpFilled from '../IconComponents/IconArrowUpFilled';
import IconArrowDownFilled from '../IconComponents/IconArrowDownFilled';

type AddNewPatientCollapseTogglerProps = {
  title: string;
  children: React.ReactNode;
};

const AddNewPatientCollapseToggler = (
  props: AddNewPatientCollapseTogglerProps
) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { title, children, ...rest } = props;
  return (
    <>
      <Flex
        {...rest}
        onClick={() => setOpened((open) => !open)}
        bg={appColors.halfFade}
        w="100%"
        style={{ borderRadius: '10px', cursor: 'pointer' }}
        align={'center'}
        justify={'space-between'}
        h="45px"
        px={'20px'}
        my={'16px'}
      >
        <Text fw={700} fz="18px" lh="22px">
          {title}
        </Text>
        {opened ? <IconArrowUpFilled /> : <IconArrowDownFilled />}
      </Flex>
      <Collapse in={opened} px={0}>
        {children}
      </Collapse>
    </>
  );
};
export default AddNewPatientCollapseToggler;
