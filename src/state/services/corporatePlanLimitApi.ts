import { baseApi as api } from './baseApi';
export const addTagTypes = ['CorporatePlanLimit'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppCorporateplanlimitCreateorupdatePost: build.mutation<
        ApiServicesAppCorporateplanlimitCreateorupdatePostApiResponse,
        ApiServicesAppCorporateplanlimitCreateorupdatePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/CorporatePlanLimit/CreateOrUpdate`,
          method: 'POST',
          body: queryArg.corporatePlanLimitRequestDto,
        }),
        invalidatesTags: ['CorporatePlanLimit'],
      }),
      apiServicesAppCorporateplanlimitGetallGet: build.query<
        ApiServicesAppCorporateplanlimitGetallGetApiResponse,
        ApiServicesAppCorporateplanlimitGetallGetApiArg
      >({
        query: () => ({ url: `/api/services/app/CorporatePlanLimit/GetAll` }),
        providesTags: ['CorporatePlanLimit'],
      }),
      apiServicesAppCorporateplanlimitTogglecorporateplanlimitPost:
        build.mutation<
          ApiServicesAppCorporateplanlimitTogglecorporateplanlimitPostApiResponse,
          ApiServicesAppCorporateplanlimitTogglecorporateplanlimitPostApiArg
        >({
          query: (queryArg) => ({
            url: `/api/services/app/CorporatePlanLimit/ToggleCorporatePlanLimit`,
            method: 'POST',
            params: { corporatePlanLimitId: queryArg.corporatePlanLimitId },
          }),
          invalidatesTags: ['CorporatePlanLimit'],
        }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as corporatePlanLimitApi };
export type ApiServicesAppCorporateplanlimitCreateorupdatePostApiResponse =
  unknown;
export type ApiServicesAppCorporateplanlimitCreateorupdatePostApiArg = {
  corporatePlanLimitRequestDto: CorporatePlanLimitRequestDto;
};
export type ApiServicesAppCorporateplanlimitGetallGetApiResponse =
  /** status 200 Success */ CorporatePlanLimitDto[];
export type ApiServicesAppCorporateplanlimitGetallGetApiArg = void;
export type ApiServicesAppCorporateplanlimitTogglecorporateplanlimitPostApiResponse =
  unknown;
export type ApiServicesAppCorporateplanlimitTogglecorporateplanlimitPostApiArg =
  {
    corporatePlanLimitId?: number;
  };
export type CorporatePlanLimitRequestDto = {
  id?: number | null;
  corporateJobTitleId: number;
  corporatePlanLimitEnrolmentPlanIds: number[];
  corporatePlanLimitJobLevelIds: number[];
  isActive?: boolean;
};
export type CorporatePlanLimitEnrolmentPlanDto = {
  enrolmentPlanId?: number;
  name?: string | null;
};
export type CorporatePlanLimitJobLevelDto = {
  name?: string | null;
  corporateJobTitleLevelId?: number;
};
export type CorporatePlanLimitDto = {
  id?: number;
  isActive?: boolean;
  corporateJobTitleId?: number;
  corporateJobTitle?: string | null;
  corporateMerchantId?: number;
  corporatePlanLimitEnrolmentPlans?:
    | CorporatePlanLimitEnrolmentPlanDto[]
    | null;
  corporatePlanLimitJobLevels?: CorporatePlanLimitJobLevelDto[] | null;
};
export const {
  useApiServicesAppCorporateplanlimitCreateorupdatePostMutation,
  useApiServicesAppCorporateplanlimitGetallGetQuery,
  useApiServicesAppCorporateplanlimitTogglecorporateplanlimitPostMutation,
} = injectedRtkApi;
