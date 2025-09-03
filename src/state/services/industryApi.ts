import { baseApi as api } from './baseApi';
export const addTagTypes = ['Industry'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppIndustryCreateindustryPost: build.mutation<
        ApiServicesAppIndustryCreateindustryPostApiResponse,
        ApiServicesAppIndustryCreateindustryPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Industry/CreateIndustry`,
          method: 'POST',
          body: queryArg.industriesDto,
        }),
        invalidatesTags: ['Industry'],
      }),
      apiServicesAppIndustryGetindustriesGet: build.query<
        ApiServicesAppIndustryGetindustriesGetApiResponse,
        ApiServicesAppIndustryGetindustriesGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Industry/GetIndustries` }),
        providesTags: ['Industry'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as industryApi };
export type ApiServicesAppIndustryCreateindustryPostApiResponse = unknown;
export type ApiServicesAppIndustryCreateindustryPostApiArg = {
  industriesDto: IndustriesDto;
};
export type ApiServicesAppIndustryGetindustriesGetApiResponse =
  /** status 200 Success */ IndustriesDto[];
export type ApiServicesAppIndustryGetindustriesGetApiArg = void;
export type IndustriesDto = {
  id?: number;
  name: string;
  description?: string | null;
};
export const {
  useApiServicesAppIndustryCreateindustryPostMutation,
  useApiServicesAppIndustryGetindustriesGetQuery,
} = injectedRtkApi;
