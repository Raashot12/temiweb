import { Button, MantineThemeOverride, rem } from '@mantine/core';
import { appColors } from './colors';
import classes from './theme.module.css';


export const defaultFonts =
  'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif';

export const inputStyles = {
  input: {
    height: '2.5rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    borderRadius: 10,
    fontWeight: 500,
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: appColors?.text,
    marginBottom: '4px',
  },
  placeholder: {
    color: appColors?.lowerText,
    fontWeight: 500,
    fontSize: '1rem',
  },
};

export const buttonStyles = {
  root: {
    height: '2.5rem',
  },
  label: {
    fontSize: '1rem',
  },
  
};

export const checkboxStyles = {
  label: {
    display: 'block',
  },
};

export const appTheme: MantineThemeOverride = {
  black: '#051438',
  colors: {
    brand: [
      '#3F8CD0',
      '#060746',
      '#3F8CD0',
      '#0e10a4',
      '#1314d3',
      '#2c2eec',
      '#5b5cf1',
      '#8a8bf5',
      '#b9b9f9',
      '#e8e8fd',
    ],
  },
  primaryColor: 'brand',
  primaryShade: 2,
  defaultRadius: 'md',
  fontFamily: defaultFonts,
  headings: {
    fontFamily: defaultFonts,
    sizes: {
      h2: { fontWeight: '700', fontSize: rem(24), lineHeight: '1.35' },
      h3: { fontWeight: '600', fontSize: rem(18), lineHeight: '1.25' },
    },
  },
  components: {
    Input: {
      styles: () => ({
        input: inputStyles.input,
        label: inputStyles.label,
      }),
    },
    InputWrapper: {
      styles: () => ({
        label: inputStyles.label,
      }),
    },
    PasswordInput: {
      styles: () => ({
        innerInput: inputStyles.input,
      }),
    },
    Button: Button.extend({
      // use CSS variables to keep hover equal to base
      vars: () => ({
        root: {
          '--button-bg': appColors.temiBlue,
          '--button-hover': appColors.temiBlue,
          '--button-color': appColors.white,
          '--button-bd': 'transparent',
        },
      }),
      // only flat props here (no nested selectors)
      styles: {
        root: { height: rem(40), borderRadius: rem(6) },
        label: { fontSize: rem(16) },
      },
      // kill pseudo-states with CSS module
      classNames: {
        root: `${classes.noHoverRoot} my-root-class`,
        label: 'my-label-class',
        inner: 'my-inner-class',
      },
    }),
    Checkbox: {
      styles: () => checkboxStyles,
    },
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
};
