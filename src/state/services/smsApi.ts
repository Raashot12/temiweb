import { baseApi as api } from './baseApi';
export const addTagTypes = ['HostSettings', 'Profile', 'Sms'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppHostsettingsGetsmssettingsGet: build.query<
        ApiServicesAppHostsettingsGetsmssettingsGetApiResponse,
        ApiServicesAppHostsettingsGetsmssettingsGetApiArg
      >({
        query: () => ({ url: `/api/services/app/HostSettings/GetSmsSettings` }),
        providesTags: ['HostSettings'],
      }),
      apiServicesAppProfileSendverificationsmsPost: build.mutation<
        ApiServicesAppProfileSendverificationsmsPostApiResponse,
        ApiServicesAppProfileSendverificationsmsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Profile/SendVerificationSms`,
          method: 'POST',
          body: queryArg.sendVerificationSmsInputDto,
        }),
        invalidatesTags: ['Profile'],
      }),
      apiServicesAppProfileVerifysmscodePost: build.mutation<
        ApiServicesAppProfileVerifysmscodePostApiResponse,
        ApiServicesAppProfileVerifysmscodePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Profile/VerifySmsCode`,
          method: 'POST',
          body: queryArg.verifySmsCodeInputDto,
        }),
        invalidatesTags: ['Profile'],
      }),
      apiServicesAppSmsSendtestsmsPost: build.mutation<
        ApiServicesAppSmsSendtestsmsPostApiResponse,
        ApiServicesAppSmsSendtestsmsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Sms/SendTestSms`,
          method: 'POST',
          body: queryArg.smsParameter,
        }),
        invalidatesTags: ['Sms'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as smsApi };
export type ApiServicesAppHostsettingsGetsmssettingsGetApiResponse =
  /** status 200 Success */ SmsSettingsEditDto;
export type ApiServicesAppHostsettingsGetsmssettingsGetApiArg = void;
export type ApiServicesAppProfileSendverificationsmsPostApiResponse = unknown;
export type ApiServicesAppProfileSendverificationsmsPostApiArg = {
  sendVerificationSmsInputDto: SendVerificationSmsInputDto;
};
export type ApiServicesAppProfileVerifysmscodePostApiResponse = unknown;
export type ApiServicesAppProfileVerifysmscodePostApiArg = {
  verifySmsCodeInputDto: VerifySmsCodeInputDto;
};
export type ApiServicesAppSmsSendtestsmsPostApiResponse = unknown;
export type ApiServicesAppSmsSendtestsmsPostApiArg = {
  smsParameter: SmsParameter;
};
export type SmsSettingsEditDto = {
  userName?: string | null;
  apiKey?: string | null;
  defaultSender?: string | null;
  baseUrl?: string | null;
  useDefaultCredentials?: boolean;
};
export type SendVerificationSmsInputDto = {
  phoneNumber?: string | null;
};
export type VerifySmsCodeInputDto = {
  code?: string | null;
  phoneNumber?: string | null;
};
export type SmsParameter = {
  messageText?: string | null;
  recipients?: string | null;
};
export const {
  useApiServicesAppHostsettingsGetsmssettingsGetQuery,
  useApiServicesAppProfileSendverificationsmsPostMutation,
  useApiServicesAppProfileVerifysmscodePostMutation,
  useApiServicesAppSmsSendtestsmsPostMutation,
} = injectedRtkApi;
