import { baseApi as api } from './baseApi';
export const addTagTypes = ['Account', 'EnroleeProfile', 'TokenAuth'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppAccountIstenantavailablePost: build.mutation<
        ApiServicesAppAccountIstenantavailablePostApiResponse,
        ApiServicesAppAccountIstenantavailablePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/IsTenantAvailable`,
          method: 'POST',
          body: queryArg.isTenantAvailableInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountResolvetenantidPost: build.mutation<
        ApiServicesAppAccountResolvetenantidPostApiResponse,
        ApiServicesAppAccountResolvetenantidPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/ResolveTenantId`,
          method: 'POST',
          body: queryArg.resolveTenantIdInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountRegisterPost: build.mutation<
        ApiServicesAppAccountRegisterPostApiResponse,
        ApiServicesAppAccountRegisterPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/Register`,
          method: 'POST',
          body: queryArg.registerInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountSendpasswordresetcodePost: build.mutation<
        ApiServicesAppAccountSendpasswordresetcodePostApiResponse,
        ApiServicesAppAccountSendpasswordresetcodePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/SendPasswordResetCode`,
          method: 'POST',
          body: queryArg.sendPasswordResetCodeInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountResetpasswordPost: build.mutation<
        ApiServicesAppAccountResetpasswordPostApiResponse,
        ApiServicesAppAccountResetpasswordPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/ResetPassword`,
          method: 'POST',
          body: queryArg.resetPasswordInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountSendemailactivationlinkPost: build.mutation<
        ApiServicesAppAccountSendemailactivationlinkPostApiResponse,
        ApiServicesAppAccountSendemailactivationlinkPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/SendEmailActivationLink`,
          method: 'POST',
          body: queryArg.sendEmailActivationLinkInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountActivateemailPost: build.mutation<
        ApiServicesAppAccountActivateemailPostApiResponse,
        ApiServicesAppAccountActivateemailPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/ActivateEmail`,
          method: 'POST',
          body: queryArg.activateEmailInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountImpersonateuserPost: build.mutation<
        ApiServicesAppAccountImpersonateuserPostApiResponse,
        ApiServicesAppAccountImpersonateuserPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/ImpersonateUser`,
          method: 'POST',
          body: queryArg.impersonateUserInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountImpersonatetenantPost: build.mutation<
        ApiServicesAppAccountImpersonatetenantPostApiResponse,
        ApiServicesAppAccountImpersonatetenantPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/ImpersonateTenant`,
          method: 'POST',
          body: queryArg.impersonateTenantInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountDelegatedimpersonatePost: build.mutation<
        ApiServicesAppAccountDelegatedimpersonatePostApiResponse,
        ApiServicesAppAccountDelegatedimpersonatePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/DelegatedImpersonate`,
          method: 'POST',
          body: queryArg.delegatedImpersonateInput,
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountBacktoimpersonatorPost: build.mutation<
        ApiServicesAppAccountBacktoimpersonatorPostApiResponse,
        ApiServicesAppAccountBacktoimpersonatorPostApiArg
      >({
        query: () => ({
          url: `/api/services/app/Account/BackToImpersonator`,
          method: 'POST',
        }),
        invalidatesTags: ['Account'],
      }),
      apiServicesAppAccountSwitchtolinkedaccountPost: build.mutation<
        ApiServicesAppAccountSwitchtolinkedaccountPostApiResponse,
        ApiServicesAppAccountSwitchtolinkedaccountPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Account/SwitchToLinkedAccount`,
          method: 'POST',
          body: queryArg.switchToLinkedAccountInput,
        }),
        invalidatesTags: ['Account'],
      }),
      enroleeCreateaccountPost: build.mutation<
        EnroleeCreateaccountPostApiResponse,
        EnroleeCreateaccountPostApiArg
      >({
        query: (queryArg) => ({
          url: `/Enrolee/CreateAccount`,
          method: 'POST',
          body: queryArg.createUserAccount,
        }),
        invalidatesTags: ['EnroleeProfile'],
      }),
      apiTokenauthLinkedaccountauthenticatePost: build.mutation<
        ApiTokenauthLinkedaccountauthenticatePostApiResponse,
        ApiTokenauthLinkedaccountauthenticatePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/TokenAuth/LinkedAccountAuthenticate`,
          method: 'POST',
          params: { switchAccountToken: queryArg.switchAccountToken },
        }),
        invalidatesTags: ['TokenAuth'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as accountApi };
export type ApiServicesAppAccountIstenantavailablePostApiResponse =
  /** status 200 Success */ IsTenantAvailableOutput;
export type ApiServicesAppAccountIstenantavailablePostApiArg = {
  isTenantAvailableInput: IsTenantAvailableInput;
};
export type ApiServicesAppAccountResolvetenantidPostApiResponse =
  /** status 200 Success */ number;
export type ApiServicesAppAccountResolvetenantidPostApiArg = {
  resolveTenantIdInput: ResolveTenantIdInput;
};
export type ApiServicesAppAccountRegisterPostApiResponse =
  /** status 200 Success */ RegisterOutput;
export type ApiServicesAppAccountRegisterPostApiArg = {
  registerInput: RegisterInput;
};
export type ApiServicesAppAccountSendpasswordresetcodePostApiResponse = unknown;
export type ApiServicesAppAccountSendpasswordresetcodePostApiArg = {
  sendPasswordResetCodeInput: SendPasswordResetCodeInput;
};
export type ApiServicesAppAccountResetpasswordPostApiResponse =
  /** status 200 Success */ ResetPasswordOutput;
export type ApiServicesAppAccountResetpasswordPostApiArg = {
  resetPasswordInput: ResetPasswordInput;
};
export type ApiServicesAppAccountSendemailactivationlinkPostApiResponse =
  unknown;
export type ApiServicesAppAccountSendemailactivationlinkPostApiArg = {
  sendEmailActivationLinkInput: SendEmailActivationLinkInput;
};
export type ApiServicesAppAccountActivateemailPostApiResponse = unknown;
export type ApiServicesAppAccountActivateemailPostApiArg = {
  activateEmailInput: ActivateEmailInput;
};
export type ApiServicesAppAccountImpersonateuserPostApiResponse =
  /** status 200 Success */ ImpersonateOutput;
export type ApiServicesAppAccountImpersonateuserPostApiArg = {
  impersonateUserInput: ImpersonateUserInput;
};
export type ApiServicesAppAccountImpersonatetenantPostApiResponse =
  /** status 200 Success */ ImpersonateOutput;
export type ApiServicesAppAccountImpersonatetenantPostApiArg = {
  impersonateTenantInput: ImpersonateTenantInput;
};
export type ApiServicesAppAccountDelegatedimpersonatePostApiResponse =
  /** status 200 Success */ ImpersonateOutput;
export type ApiServicesAppAccountDelegatedimpersonatePostApiArg = {
  delegatedImpersonateInput: DelegatedImpersonateInput;
};
export type ApiServicesAppAccountBacktoimpersonatorPostApiResponse =
  /** status 200 Success */ ImpersonateOutput;
export type ApiServicesAppAccountBacktoimpersonatorPostApiArg = void;
export type ApiServicesAppAccountSwitchtolinkedaccountPostApiResponse =
  /** status 200 Success */ SwitchToLinkedAccountOutput;
export type ApiServicesAppAccountSwitchtolinkedaccountPostApiArg = {
  switchToLinkedAccountInput: SwitchToLinkedAccountInput;
};
export type EnroleeCreateaccountPostApiResponse =
  /** status 200 Success */ CreateEnroleeProfileResponseDto;
export type EnroleeCreateaccountPostApiArg = {
  createUserAccount: CreateUserAccount;
};
export type ApiTokenauthLinkedaccountauthenticatePostApiResponse =
  /** status 200 Success */ SwitchedAccountAuthenticateResultModel;
export type ApiTokenauthLinkedaccountauthenticatePostApiArg = {
  switchAccountToken?: string;
};
export type TenantAvailabilityState = 1 | 2 | 3;
export type IsTenantAvailableOutput = {
  state?: TenantAvailabilityState;
  tenantId?: number | null;
  serverRootAddress?: string | null;
};
export type IsTenantAvailableInput = {
  tenancyName: string;
};
export type ResolveTenantIdInput = {
  c?: string | null;
};
export type RegisterOutput = {
  canLogin?: boolean;
};
export type RegisterInput = {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  password: string;
  captchaResponse?: string | null;
};
export type SendPasswordResetCodeInput = {
  emailAddress: string;
};
export type ResetPasswordOutput = {
  canLogin?: boolean;
  userName?: string | null;
};
export type ResetPasswordInput = {
  userId?: number;
  resetCode?: string | null;
  expireDate?: string;
  password?: string | null;
  returnUrl?: string | null;
  singleSignIn?: string | null;
  c?: string | null;
};
export type SendEmailActivationLinkInput = {
  emailAddress: string;
};
export type ActivateEmailInput = {
  userId?: number;
  confirmationCode?: string | null;
  c?: string | null;
};
export type ImpersonateOutput = {
  impersonationToken?: string | null;
  tenancyName?: string | null;
};
export type ImpersonateUserInput = {
  tenantId?: number | null;
  userId?: number;
};
export type ImpersonateTenantInput = {
  tenantId?: number | null;
  userId?: number;
};
export type DelegatedImpersonateInput = {
  userDelegationId?: number;
};
export type SwitchToLinkedAccountOutput = {
  switchAccountToken?: string | null;
  tenancyName?: string | null;
};
export type SwitchToLinkedAccountInput = {
  targetTenantId?: number | null;
  targetUserId?: number;
};
export type CreateEnroleeProfileResponseDto = {
  accessToken?: string | null;
  refreshToken?: string | null;
  userId?: number;
};
export type CreateUserAccount = {
  tenantId?: number;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  username: string;
  password: string;
  confirmPassword: string;
};
export type SwitchedAccountAuthenticateResultModel = {
  accessToken?: string | null;
  encryptedAccessToken?: string | null;
  expireInSeconds?: number;
};
export const {
  useApiServicesAppAccountIstenantavailablePostMutation,
  useApiServicesAppAccountResolvetenantidPostMutation,
  useApiServicesAppAccountRegisterPostMutation,
  useApiServicesAppAccountSendpasswordresetcodePostMutation,
  useApiServicesAppAccountResetpasswordPostMutation,
  useApiServicesAppAccountSendemailactivationlinkPostMutation,
  useApiServicesAppAccountActivateemailPostMutation,
  useApiServicesAppAccountImpersonateuserPostMutation,
  useApiServicesAppAccountImpersonatetenantPostMutation,
  useApiServicesAppAccountDelegatedimpersonatePostMutation,
  useApiServicesAppAccountBacktoimpersonatorPostMutation,
  useApiServicesAppAccountSwitchtolinkedaccountPostMutation,
  useEnroleeCreateaccountPostMutation,
  useApiTokenauthLinkedaccountauthenticatePostMutation,
} = injectedRtkApi;
