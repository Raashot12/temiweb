import { baseApi as api } from './baseApi';
export const addTagTypes = ['Tiers'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppTiersCreatetierPost: build.mutation<
        ApiServicesAppTiersCreatetierPostApiResponse,
        ApiServicesAppTiersCreatetierPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Tiers/CreateTier`,
          method: 'POST',
          body: queryArg.createTiersRequestDto,
        }),
        invalidatesTags: ['Tiers'],
      }),
      apiServicesAppTiersGettiersGet: build.query<
        ApiServicesAppTiersGettiersGetApiResponse,
        ApiServicesAppTiersGettiersGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Tiers/GetTiers`,
          params: {
            Filter: queryArg.filter,
            Sorting: queryArg.sorting,
            SkipCount: queryArg.skipCount,
            MaxResultCount: queryArg.maxResultCount,
          },
        }),
        providesTags: ['Tiers'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as tiersApi };
export type ApiServicesAppTiersCreatetierPostApiResponse = unknown;
export type ApiServicesAppTiersCreatetierPostApiArg = {
  createTiersRequestDto: CreateTiersRequestDto;
};
export type ApiServicesAppTiersGettiersGetApiResponse =
  /** status 200 Success */ PagedResultDtoOfGetTiersResponseDto;
export type ApiServicesAppTiersGettiersGetApiArg = {
  filter?: string;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
};
export type CreateTiersRequestDto = {
  name: string;
};
export type GetTierProvidersResponseDto = {
  providerId?: number;
  providerName?: string | null;
};
export type GetTierEnrolmentPlansResponseDto = {
  enrolmentPlanId?: number;
  enrolmentPlanName?: string | null;
};
export type GetTiersResponseDto = {
  id?: number;
  name?: string | null;
  tierProviders?: GetTierProvidersResponseDto[] | null;
  tierEnrolmentPlans?: GetTierEnrolmentPlansResponseDto[] | null;
};
export type PagedResultDtoOfGetTiersResponseDto = {
  totalCount?: number;
  items?: GetTiersResponseDto[] | null;
};
export const {
  useApiServicesAppTiersCreatetierPostMutation,
  useApiServicesAppTiersGettiersGetQuery,
} = injectedRtkApi;
