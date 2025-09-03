import React from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { appColors } from '@/theme/colors';

// Breakpoint keys compatible with Mantine default theme
export type BreakpointKey = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type WidthProp = Partial<Record<BreakpointKey, number | string>>;

type ClassNamesLike = {
  root?: React.CSSProperties; // allow style-like override for compatibility with existing usage
};

export type NavbarProps = {
  children?: React.ReactNode;
  width?: WidthProp;
  hiddenBreakpoint?: Exclude<BreakpointKey, 'base'>;
  hidden?: boolean;
  classNames?: ClassNamesLike;
  style?: React.CSSProperties;
  withBorder?: boolean;
};

const ensureCssSize = (v?: number | string): string | undefined => {
  if (v === undefined || v === null) return undefined;
  if (typeof v === 'number') return `${v}px`;
  return v;
};

// Convert Mantine breakpoint value (number px or string like '48em') to px number
const bpToPx = (v: number | string): number => {
  if (typeof v === 'number') return v;
  const str = String(v).trim();
  if (str.endsWith('em')) return parseFloat(str) * 16;
  if (str.endsWith('px')) return parseFloat(str);
  return parseFloat(str);
};

const resolveResponsiveWidth = (
  width: WidthProp | undefined,
  viewportPx: number,
  theme: import('@mantine/core').MantineTheme,
): string | undefined => {
  if (!width) return undefined;
  const px = {
    xs: bpToPx(theme.breakpoints.xs),
    sm: bpToPx(theme.breakpoints.sm),
    md: bpToPx(theme.breakpoints.md),
    lg: bpToPx(theme.breakpoints.lg),
    xl: bpToPx(theme.breakpoints.xl),
  };

  // Determine which key applies based on viewport width
  let val: number | string | undefined = undefined;
  if (viewportPx >= px.xl && width.xl !== undefined) val = width.xl;
  else if (viewportPx >= px.lg && width.lg !== undefined) val = width.lg;
  else if (viewportPx >= px.md && width.md !== undefined) val = width.md;
  else if (viewportPx >= px.sm && width.sm !== undefined) val = width.sm;
  else if (viewportPx >= px.xs && width.xs !== undefined) val = width.xs;
  else if (width.base !== undefined) val = width.base;

  return ensureCssSize(val);
};

const computeHidden = (
  hiddenBreakpoint: NavbarProps['hiddenBreakpoint'],
  hidden: NavbarProps['hidden'],
  viewportPx: number,
  theme: import('@mantine/core').MantineTheme,
) => {
  if (hiddenBreakpoint) {
    const bpPx = bpToPx(theme.breakpoints[hiddenBreakpoint]);
    return viewportPx < bpPx ? !!hidden : false;
  }
  return !!hidden;
};

const NavbarRoot: React.FC<NavbarProps> = ({
  children,
  width,
  hiddenBreakpoint,
  hidden,
  classNames,
  style,
  withBorder = true,
}) => {
  const theme = useMantineTheme();
  const { width: viewportWidth } = useViewportSize();

  const resolvedWidth = resolveResponsiveWidth(
    width ?? {},
    viewportWidth,
    theme,
  );
  const isHidden = computeHidden(
    hiddenBreakpoint,
    hidden,
    viewportWidth,
    theme,
  );

  const borderColor = theme.colors.gray?.[3] ?? '#e5e7eb';

  return (
    <Box
      component="nav"
      style={{
        display: isHidden ? 'none' : 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        backgroundColor: appColors.deepWhite,
        borderRight: withBorder ? `1px solid ${borderColor}` : undefined,
        // Allow consumers to pass borderBottom in their styles if needed
        width: resolvedWidth,
        minWidth: resolvedWidth,
        transition:
          'width 300ms ease, min-width 300ms ease, padding 300ms ease',
        overflow: 'hidden',
        ...(classNames?.root ?? {}),
        ...(style ?? {}),
      }}
    >
      {children}
    </Box>
  );
};

export type NavbarSectionProps = {
  children?: React.ReactNode;
  grow?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const NavbarSection: React.FC<NavbarSectionProps> = ({
  children,
  grow,
  style,
  className,
}) => {
  return (
    <Box
      className={className}
      style={{
        flex: grow ? 1 : undefined,
        overflow: grow ? 'auto' : undefined,
        ...style,
      }}
    >
      {children}
    </Box>
  );
};

const Navbar = Object.assign(NavbarRoot, { Section: NavbarSection });

export default Navbar;
