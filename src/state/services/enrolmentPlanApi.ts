import { baseApi as api } from './baseApi';
export const addTagTypes = ['EnrolmentPlan'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppEnrolmentplanCreateplanPost: build.mutation<
        ApiServicesAppEnrolmentplanCreateplanPostApiResponse,
        ApiServicesAppEnrolmentplanCreateplanPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/EnrolmentPlan/CreatePlan`,
          method: 'POST',
          body: queryArg.createPlanDto,
        }),
        invalidatesTags: ['EnrolmentPlan'],
      }),
      apiServicesAppEnrolmentplanGetplansGet: build.query<
        ApiServicesAppEnrolmentplanGetplansGetApiResponse,
        ApiServicesAppEnrolmentplanGetplansGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/EnrolmentPlan/GetPlans`,
          params: {
            Filter: queryArg.filter,
            TierId: queryArg.tierId,
            SortByDescending: queryArg.sortByDescending,
            Sorting: queryArg.sorting,
            SkipCount: queryArg.skipCount,
            MaxResultCount: queryArg.maxResultCount,
          },
        }),
        providesTags: ['EnrolmentPlan'],
      }),
      apiServicesAppEnrolmentplanUpdateplanPut: build.mutation<
        ApiServicesAppEnrolmentplanUpdateplanPutApiResponse,
        ApiServicesAppEnrolmentplanUpdateplanPutApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/EnrolmentPlan/UpdatePlan`,
          method: 'PUT',
          body: queryArg.createPlanDto,
        }),
        invalidatesTags: ['EnrolmentPlan'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enrolmentPlanApi };
export type ApiServicesAppEnrolmentplanCreateplanPostApiResponse =
  /** status 200 Success */ CreatePlanDto;
export type ApiServicesAppEnrolmentplanCreateplanPostApiArg = {
  createPlanDto: CreatePlanDto;
};
export type ApiServicesAppEnrolmentplanGetplansGetApiResponse =
  /** status 200 Success */ PagedResultDtoOfGetPlanListResponseDto;
export type ApiServicesAppEnrolmentplanGetplansGetApiArg = {
  filter?: string;
  tierId?: number;
  sortByDescending?: boolean;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
};
export type ApiServicesAppEnrolmentplanUpdateplanPutApiResponse =
  /** status 200 Success */ CreatePlanDto;
export type ApiServicesAppEnrolmentplanUpdateplanPutApiArg = {
  createPlanDto: CreatePlanDto;
};
export type MoneyDto = {
  amount: number;
  currency: string;
};
export type PlanType = 'General' | 'Bespoke';
export type PlanCoverage = 0 | 1 | 2;
export type EnrolmentPriceSettingDto = {
  planCoverage?: PlanCoverage;
  price?: MoneyDto;
};
export type CreatePlanDto = {
  tenantId?: number;
  planName: string;
  description?: string | null;
  providers?: number[] | null;
  tiers?: number[] | null;
  countries?: number[] | null;
  overallLimit: MoneyDto;
  planType: PlanType;
  priceSettings?: EnrolmentPriceSettingDto[] | null;
  id?: number;
};
export type GetPlanListResponseDto = {
  id?: number;
  planName?: string | null;
  description?: string | null;
  planType?: PlanType;
  overallLimit?: MoneyDto;
};
export type PagedResultDtoOfGetPlanListResponseDto = {
  totalCount?: number;
  items?: GetPlanListResponseDto[] | null;
};
export const {
  useApiServicesAppEnrolmentplanCreateplanPostMutation,
  useApiServicesAppEnrolmentplanGetplansGetQuery,
  useApiServicesAppEnrolmentplanUpdateplanPutMutation,
} = injectedRtkApi;
