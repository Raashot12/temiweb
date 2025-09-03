import { baseApi as api } from './baseApi';
export const addTagTypes = ['EnroleeProfile'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      enroleeCreateenroleeprofilePost: build.mutation<
        EnroleeCreateenroleeprofilePostApiResponse,
        EnroleeCreateenroleeprofilePostApiArg
      >({
        query: (queryArg) => ({
          url: `/Enrolee/CreateEnroleeProfile`,
          method: 'POST',
          body: queryArg.createEnroleeProfileRequestDto,
        }),
        invalidatesTags: ['EnroleeProfile'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enroleeProfileApi };
export type EnroleeCreateenroleeprofilePostApiResponse =
  /** status 200 Success */ CreateEnroleeProfileResponseDto;
export type EnroleeCreateenroleeprofilePostApiArg = {
  createEnroleeProfileRequestDto: CreateEnroleeProfileRequestDto;
};
export type CreateEnroleeProfileResponseDto = {
  accessToken?: string | null;
  refreshToken?: string | null;
  userId?: number;
};
export type CreateEnroleeProfileRequestDto = {
  tenantId?: number;
  enroleeId?: number;
  username: string;
  password: string;
  confirmPassword: string;
};
export const { useEnroleeCreateenroleeprofilePostMutation } = injectedRtkApi;
