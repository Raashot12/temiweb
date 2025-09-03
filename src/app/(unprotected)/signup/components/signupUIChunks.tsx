import { Box } from "@mantine/core";
export const UrlSchemeWrapper = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      backgroundColor: '#dfe2e9',
      cursor: 'pointer',
      borderBottomLeftRadius: '10px',
      borderTopLeftRadius: '10px',
      '@media (max-width: 576px)': {
        display: 'none',
      },
      ...props.style,
    }}
  >
    {children}
  </Box>
);

export const AppDomainWrapper = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      backgroundColor: '#dfe2e9',
      cursor: 'pointer',
      borderBottomRightRadius: '10px',
      borderTopRightRadius: '10px',
      flexGrow: 1,
      '@media (max-width: 576px)': {
        padding: '0 0.2rem',
        fontSize: '0.8rem',
      },
      ...props.style,
    }}
  >
    {children}
  </Box>
);

export const IconWrapper = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      width: '24px',
      height: '24px',
      marginLeft: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      '@media (max-width: 768px)': {
        marginLeft: '0.6rem',
        width: '20px',
        height: '20px',
      },
      '@media (max-width: 576px)': {
        marginLeft: '0.2rem',
      },
      ...props.style,
    }}
  >
    {children}
  </Box>
);

export const ValidIconWrapper = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      width: '24px',
      height: '24px',
      marginLeft: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: '2px solid #27ae60',
      '@media (max-width: 768px)': {
        marginLeft: '0.6rem',
        width: '20px',
        height: '20px',
      },
      '@media (max-width: 576px)': {
        marginLeft: '0.2rem',
      },
      ...props.style,
    }}
  >
    {children}
  </Box>
);

export const InValidIconWrapper = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      width: '24px',
      height: '24px',
      marginLeft: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: '2px solid red',
      '@media (max-width: 768px)': {
        marginLeft: '0.6rem',
        width: '20px',
        height: '20px',
      },
      '@media (max-width: 576px)': {
        marginLeft: '0.2rem',
      },
      ...props.style,
    }}
  >
    {children}
  </Box>
);

export const BusinessCodeWrapper = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      display: 'flex',
      alignItems: 'end',
      position: 'relative',
      ...props.style,
    }}
  >
    {children}
  </Box>
);

export const TipWrapper = ({ children, ...props }: any) => (
  <Box
    {...props}
    style={{
      position: 'absolute',
      top: '3px',
      left: '135px',
      ...props.style,
    }}
  >
    {children}
  </Box>
);