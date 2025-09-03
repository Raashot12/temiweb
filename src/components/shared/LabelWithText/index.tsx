'use client';
import { Stack, Text, Tooltip } from '@mantine/core';
import classes from './LabelWithText.module.css';
import React, { useRef, useState, useEffect } from 'react';

export const LabelWithText = ({
  label,
  text,
}: {
  label: string;
  text: string | React.ReactNode;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollWidth > textRef.current.clientWidth
        );
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (textRef.current) observer.observe(textRef.current);

    handleResize();

    return () => observer.disconnect();
  }, [text]);
  
  return (
    <Stack gap={0}>
      <Text fw={600} size="sm" className={classes.label}>
        {label}
      </Text>
      <Tooltip label={text} disabled={!isTruncated}>
        <Text
          ref={textRef}
          style={{ whiteSpace: 'nowrap' }}
          size="md"
          fw={500}
          truncate={isTruncated}
        >
          {text}
        </Text>
      </Tooltip>
    </Stack>
  );
};
