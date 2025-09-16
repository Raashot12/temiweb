
import React, { useEffect, useRef } from 'react';
import { Flex, ScrollArea, ScrollAreaAutosizeProps } from '@mantine/core';

export const AutoScrollContainer = (
  props: ScrollAreaAutosizeProps & { disabled?: boolean; autoScroll?: boolean }
) => {
  const { children, autoScroll, ...rest } = props;
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && viewport?.current?.scrollTo instanceof Function) {
      viewport?.current?.scrollTo({
        top: viewport?.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [children]);

  return (
    <ScrollArea
      mih={'4em'}
      h={'inherit'}
      {...rest}
      viewportRef={viewport}
      sx={{
        pointerEvents: props.disabled ? 'none' : undefined,
      }}
    >
      <Flex wrap={'wrap'} rowGap={'5px'} pos={'relative'}>
        {children}
      </Flex>
    </ScrollArea>
  );
};
