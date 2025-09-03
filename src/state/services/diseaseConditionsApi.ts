import { baseApi as api } from './baseApi';
export const addTagTypes = ['DiseaseConditions'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppDiseaseconditionsCreatediseaseconditionPost: build.mutation<
        ApiServicesAppDiseaseconditionsCreatediseaseconditionPostApiResponse,
        ApiServicesAppDiseaseconditionsCreatediseaseconditionPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/DiseaseConditions/CreateDiseaseCondition`,
          method: 'POST',
          body: queryArg.diseaseConditionDto,
        }),
        invalidatesTags: ['DiseaseConditions'],
      }),
      apiServicesAppDiseaseconditionsGetdiseaseconditionsGet: build.query<
        ApiServicesAppDiseaseconditionsGetdiseaseconditionsGetApiResponse,
        ApiServicesAppDiseaseconditionsGetdiseaseconditionsGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/DiseaseConditions/GetDiseaseConditions`,
          params: {
            Filter: queryArg.filter,
            Sorting: queryArg.sorting,
            SkipCount: queryArg.skipCount,
            MaxResultCount: queryArg.maxResultCount,
          },
        }),
        providesTags: ['DiseaseConditions'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as diseaseConditionsApi };
export type ApiServicesAppDiseaseconditionsCreatediseaseconditionPostApiResponse =
  unknown;
export type ApiServicesAppDiseaseconditionsCreatediseaseconditionPostApiArg = {
  diseaseConditionDto: DiseaseConditionDto;
};
export type ApiServicesAppDiseaseconditionsGetdiseaseconditionsGetApiResponse =
  /** status 200 Success */ PagedResultDtoOfGetDiseaseConditionsResponseDto;
export type ApiServicesAppDiseaseconditionsGetdiseaseconditionsGetApiArg = {
  filter?: string;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
};
export type DiseaseConditionDto = {
  name: string;
  synonym?: string | null;
  description?: string | null;
};
export type GetDiseaseConditionsResponseDto = {
  id?: number;
  name?: string | null;
  description?: string | null;
  synonym?: string | null;
};
export type PagedResultDtoOfGetDiseaseConditionsResponseDto = {
  totalCount?: number;
  items?: GetDiseaseConditionsResponseDto[] | null;
};
export const {
  useApiServicesAppDiseaseconditionsCreatediseaseconditionPostMutation,
  useApiServicesAppDiseaseconditionsGetdiseaseconditionsGetQuery,
} = injectedRtkApi;
