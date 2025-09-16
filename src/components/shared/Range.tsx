import React, { useState } from 'react';
import { Box, Flex, Switch } from '@mantine/core';
import NumericInput from 'react-numeric-input';
import IconL from './IconComponents/IconL';
import IconSelectArrow from './IconComponents/IconSelectArrow';


type Obj = Record<string, any>;
const Range = (props: Obj) => {
  const [checked, setChecked] = useState(false);
  return (
    <Box
      sx={{
        position: 'relative',
        top: `${props.hastoggle && '-5px'}`,
        width: 'fit-content',
      }}
    >
      <Flex align={'center'}>
        <Flex align={'center'} columnGap={25}>
          <Flex
            align={'center'}
            columnGap={10}
            mb={props.spacingbottom ? props.spacingbottom : 3}
          >
            <Box
              sx={{
                fontWeight: 600,
                fontSize: props?.editLabResult ? 15 : 18,
                color: `${props.textcolor ? `${props.textcolor}` : '#A6AFC2'}`,
                fontFamily: 'Gilroy',
              }}
            >
              {props.title}
            </Box>
            {(props.showarrow as boolean) && <IconSelectArrow />}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        align={'flex-end'}
        columnGap={5}
        data-testid={`range-numeric-input-${props.title}`}
      >
        <NumericInput
          {...props}
          mobile
          className={`plateaumed-numeric-input ${props.variant}`}
        />
        <Flex>
          <Box
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: '#051438',
              fontFamily: 'Gilroy',
            }}
          >
            {props.subtitle}
          </Box>
        </Flex>
      </Flex>
      {(props.hastoggle as boolean) && (
        <Box sx={{ position: 'absolute', top: -12, right: 0 }}>
          <Switch
            data-testid={'numeric-range-switch'}
            size={'sm'}
            checked={checked}
            sx={{ cursor: 'pointer' }}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            color="orange"
            thumbIcon={checked ? <IconL /> : <IconL />}
          />
        </Box>
      )}
    </Box>
  );
};

export default Range;
