import { baseApi as api } from './baseApi';
export const addTagTypes = ['OTP'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppOtpGenerateotpPost: build.mutation<
        ApiServicesAppOtpGenerateotpPostApiResponse,
        ApiServicesAppOtpGenerateotpPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/OTP/GenerateOtp`,
          method: 'POST',
          body: queryArg.createOtpRequestDto,
        }),
        invalidatesTags: ['OTP'],
      }),
      apiServicesAppOtpValidateotpPost: build.mutation<
        ApiServicesAppOtpValidateotpPostApiResponse,
        ApiServicesAppOtpValidateotpPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/OTP/ValidateOtp`,
          method: 'POST',
          body: queryArg.validateOtpRequestDto,
        }),
        invalidatesTags: ['OTP'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as otpApi };
export type ApiServicesAppOtpGenerateotpPostApiResponse =
  /** status 200 Success */ CreateOtpResponse;
export type ApiServicesAppOtpGenerateotpPostApiArg = {
  createOtpRequestDto: CreateOtpRequestDto;
};
export type ApiServicesAppOtpValidateotpPostApiResponse =
  /** status 200 Success */ ValidateOtpResponseDto;
export type ApiServicesAppOtpValidateotpPostApiArg = {
  validateOtpRequestDto: ValidateOtpRequestDto;
};
export type CreateOtpResponse = {
  enroleeExists?: boolean;
};
export type CreateOtpRequestDto = {
  phoneNumber?: string | null;
  email?: string | null;
};
export type ValidateOtpResponseDto = {
  enroleeId?: number | null;
  hasActivePlan?: boolean;
};
export type ValidateOtpRequestDto = {
  code: string;
  phoneNumber?: string | null;
  email?: string | null;
};
export const {
  useApiServicesAppOtpGenerateotpPostMutation,
  useApiServicesAppOtpValidateotpPostMutation,
} = injectedRtkApi;
