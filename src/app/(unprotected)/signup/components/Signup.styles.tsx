import { appColors } from '@/theme/colors';
import { CSSProperties } from 'react';


export const signupStyles = {
  appHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '0 32px',
  } as CSSProperties,
  headerRoot: {
    backgroundColor: appColors.pageBackground,
    alignItems: 'center',
    borderBottom: '2px solid #DFE2E9',
  } as CSSProperties,
  appHeaderWrapperMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '0 16px',
  } as CSSProperties,

  brandWrapper: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    cursor: 'pointer',
  } as CSSProperties,

  brandWrapperFull: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'center',
  } as CSSProperties,

  dateTimeWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 600,
    cursor: 'pointer',
  } as CSSProperties,

  dateWrapper: {
    color: '#051438',
  } as CSSProperties,

  timeWrapper: {
    color: appColors.text,
    marginLeft: '1rem',
  } as CSSProperties,

  timeWrapperMedium: {
    color: appColors.text,
    marginLeft: '0.5rem',
  } as CSSProperties,

  timeWrapperSmall: {
    color: appColors.text,
    marginLeft: '0.2rem',
  } as CSSProperties,

  headerUserWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,

  headerUserWrapperDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 230,
  } as CSSProperties,

  salutationWrapper: {
    display: 'flex',
    marginRight: 25,
  } as CSSProperties,

  salutationWrapperHidden: {
    display: 'none',
  } as CSSProperties,

  notificationBellWrapper: {
    display: 'flex',
  } as CSSProperties,

  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 25,
  } as CSSProperties,

  avatarButton: {
    display: 'block',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  } as CSSProperties,

  menuHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '0 14px',
    padding: '16px 0',
    borderBottom: '2px solid rgba(205, 216, 243, 0.5)',
  } as CSSProperties,

  menuAvatarWrapper: {
    // Empty styles - keeping for consistency
  } as CSSProperties,

  menuUserWrapper: {
    fontSize: 16,
    fontWeight: 600,
    height: 48,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 12,
  } as CSSProperties,

  menuUserFullName: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1,
  } as CSSProperties,

  menuUserRole: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1,
    color: appColors.text,
  } as CSSProperties,

  accountTypeBadge: {
    marginLeft: 'auto',
  } as CSSProperties,

  switchRoleHeader: {
    marginLeft: 12,
    padding: '0px 16px 0px 16px',
    gap: 4,
  } as CSSProperties,
};
