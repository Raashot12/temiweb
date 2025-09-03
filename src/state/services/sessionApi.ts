import { baseApi as api } from './baseApi';
export const addTagTypes = ['Session', 'StripePayment'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppSessionGetcurrentlogininformationsGet: build.query<
        ApiServicesAppSessionGetcurrentlogininformationsGetApiResponse,
        ApiServicesAppSessionGetcurrentlogininformationsGetApiArg
      >({
        query: () => ({
          url: `/api/services/app/Session/GetCurrentLoginInformations`,
        }),
        providesTags: ['Session'],
      }),
      apiServicesAppSessionUpdateusersignintokenPut: build.mutation<
        ApiServicesAppSessionUpdateusersignintokenPutApiResponse,
        ApiServicesAppSessionUpdateusersignintokenPutApiArg
      >({
        query: () => ({
          url: `/api/services/app/Session/UpdateUserSignInToken`,
          method: 'PUT',
        }),
        invalidatesTags: ['Session'],
      }),
      apiServicesAppStripepaymentCreatepaymentsessionPost: build.mutation<
        ApiServicesAppStripepaymentCreatepaymentsessionPostApiResponse,
        ApiServicesAppStripepaymentCreatepaymentsessionPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/StripePayment/CreatePaymentSession`,
          method: 'POST',
          body: queryArg.stripeCreatePaymentSessionInput,
        }),
        invalidatesTags: ['StripePayment'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as sessionApi };
export type ApiServicesAppSessionGetcurrentlogininformationsGetApiResponse =
  /** status 200 Success */ GetCurrentLoginInformationsOutputRead;
export type ApiServicesAppSessionGetcurrentlogininformationsGetApiArg = void;
export type ApiServicesAppSessionUpdateusersignintokenPutApiResponse =
  /** status 200 Success */ UpdateUserSignInTokenOutput;
export type ApiServicesAppSessionUpdateusersignintokenPutApiArg = void;
export type ApiServicesAppStripepaymentCreatepaymentsessionPostApiResponse =
  /** status 200 Success */ string;
export type ApiServicesAppStripepaymentCreatepaymentsessionPostApiArg = {
  stripeCreatePaymentSessionInput: StripeCreatePaymentSessionInput;
};
export type UserLoginInfoDto = {
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  profilePictureId?: string | null;
  id?: number;
};
export type SubscriptionPaymentType = 0 | 1 | 2;
export type EditionInfoDto = {
  displayName?: string | null;
  trialDayCount?: number | null;
  monthlyPrice?: number | null;
  annualPrice?: number | null;
  isHighestEdition?: boolean;
  isFree?: boolean;
  id?: number;
};
export type NameValueDto = {
  name?: string | null;
  value?: string | null;
};
export type PaymentPeriodType = 1 | 7 | 30 | 365;
export type TenantLoginInfoDto = {
  tenancyName?: string | null;
  name?: string | null;
  darkLogoId?: string | null;
  darkLogoFileType?: string | null;
  lightLogoId?: string | null;
  lightLogoFileType?: string | null;
  customCssId?: string | null;
  subscriptionEndDateUtc?: string | null;
  isInTrialPeriod?: boolean;
  subscriptionPaymentType?: SubscriptionPaymentType;
  edition?: EditionInfoDto;
  featureValues?: NameValueDto[] | null;
  creationTime?: string;
  paymentPeriodType?: PaymentPeriodType;
  subscriptionDateString?: string | null;
  creationTimeString?: string | null;
  id?: number;
};
export type ApplicationInfoDto = {
  version?: string | null;
  releaseDate?: string;
  currency?: string | null;
  currencySign?: string | null;
  allowTenantsToChangeEmailSettings?: boolean;
  userDelegationIsEnabled?: boolean;
  twoFactorCodeExpireSeconds?: number;
  features?: {
    [key: string]: boolean | null;
  } | null;
};
export type ThemeLayoutSettingsDto = {
  layoutType?: string | null;
  darkMode?: boolean;
};
export type ThemeHeaderSettingsDto = {
  minimizeDesktopHeaderType?: string | null;
};
export type ThemeHeaderSettingsDtoRead = {
  desktopFixedHeader?: boolean;
  mobileFixedHeader?: boolean;
  minimizeDesktopHeaderType?: string | null;
};
export type ThemeSubHeaderSettingsDto = {
  fixedSubHeader?: boolean;
  subheaderStyle?: string | null;
  subheaderSize?: number;
  titleStyle?: string | null;
  containerStyle?: string | null;
  subContainerStyle?: string | null;
};
export type ThemeMenuSettingsDto = {
  position?: string | null;
  asideSkin?: string | null;
  fixedAside?: boolean;
  allowAsideMinimizing?: boolean;
  defaultMinimizedAside?: boolean;
  submenuToggle?: string | null;
  searchActive?: boolean;
  enableSecondary?: boolean;
  hoverableAside?: boolean;
};
export type ThemeFooterSettingsDto = {
  fixedFooter?: boolean;
};
export type ThemeSettingsDto = {
  theme?: string | null;
  layout?: ThemeLayoutSettingsDto;
  header?: ThemeHeaderSettingsDto;
  subHeader?: ThemeSubHeaderSettingsDto;
  menu?: ThemeMenuSettingsDto;
  footer?: ThemeFooterSettingsDto;
};
export type ThemeSettingsDtoRead = {
  theme?: string | null;
  layout?: ThemeLayoutSettingsDto;
  header?: ThemeHeaderSettingsDtoRead;
  subHeader?: ThemeSubHeaderSettingsDto;
  menu?: ThemeMenuSettingsDto;
  footer?: ThemeFooterSettingsDto;
};
export type UiCustomizationSettingsDto = {
  baseSettings?: ThemeSettingsDto;
  isLeftMenuUsed?: boolean;
  isTopMenuUsed?: boolean;
  isTabMenuUsed?: boolean;
  allowMenuScroll?: boolean;
};
export type UiCustomizationSettingsDtoRead = {
  baseSettings?: ThemeSettingsDtoRead;
  isLeftMenuUsed?: boolean;
  isTopMenuUsed?: boolean;
  isTabMenuUsed?: boolean;
  allowMenuScroll?: boolean;
};
export type GetCurrentLoginInformationsOutput = {
  user?: UserLoginInfoDto;
  impersonatorUser?: UserLoginInfoDto;
  tenant?: TenantLoginInfoDto;
  impersonatorTenant?: TenantLoginInfoDto;
  application?: ApplicationInfoDto;
  theme?: UiCustomizationSettingsDto;
};
export type GetCurrentLoginInformationsOutputRead = {
  user?: UserLoginInfoDto;
  impersonatorUser?: UserLoginInfoDto;
  tenant?: TenantLoginInfoDto;
  impersonatorTenant?: TenantLoginInfoDto;
  application?: ApplicationInfoDto;
  theme?: UiCustomizationSettingsDtoRead;
};
export type UpdateUserSignInTokenOutput = {
  signInToken?: string | null;
  encodedUserId?: string | null;
  encodedTenantId?: string | null;
};
export type StripeCreatePaymentSessionInput = {
  paymentId?: number;
  successUrl?: string | null;
  cancelUrl?: string | null;
};
export const {
  useApiServicesAppSessionGetcurrentlogininformationsGetQuery,
  useApiServicesAppSessionUpdateusersignintokenPutMutation,
  useApiServicesAppStripepaymentCreatepaymentsessionPostMutation,
} = injectedRtkApi;
