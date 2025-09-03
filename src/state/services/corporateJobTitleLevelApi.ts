import { baseApi as api } from './baseApi';
export const addTagTypes = ['CorporateJobTitleLevel'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppCorporatejobtitlelevelCreateorupdatePost: build.mutation<
        ApiServicesAppCorporatejobtitlelevelCreateorupdatePostApiResponse,
        ApiServicesAppCorporatejobtitlelevelCreateorupdatePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/CorporateJobTitleLevel/CreateOrUpdate`,
          method: 'POST',
          body: queryArg.createCorporateJobTitleLevelRequestDto,
        }),
        invalidatesTags: ['CorporateJobTitleLevel'],
      }),
      apiServicesAppCorporatejobtitlelevelGetallGet: build.query<
        ApiServicesAppCorporatejobtitlelevelGetallGetApiResponse,
        ApiServicesAppCorporatejobtitlelevelGetallGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/CorporateJobTitleLevel/GetAll`,
          params: { corporateJobTitleId: queryArg.corporateJobTitleId },
        }),
        providesTags: ['CorporateJobTitleLevel'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as corporateJobTitleLevelApi };
export type ApiServicesAppCorporatejobtitlelevelCreateorupdatePostApiResponse =
  /** status 200 Success */ CorporateJobTitleLevelDto;
export type ApiServicesAppCorporatejobtitlelevelCreateorupdatePostApiArg = {
  createCorporateJobTitleLevelRequestDto: CreateCorporateJobTitleLevelRequestDto;
};
export type ApiServicesAppCorporatejobtitlelevelGetallGetApiResponse =
  /** status 200 Success */ CorporateJobTitleLevelDto[];
export type ApiServicesAppCorporatejobtitlelevelGetallGetApiArg = {
  corporateJobTitleId?: number;
};
export type CorporateJobTitleLevelDto = {
  id?: number;
  name?: string | null;
  corporateJobTitleId?: number;
};
export type CreateCorporateJobTitleLevelRequestDto = {
  id?: number | null;
  name: string;
  corporateJobTitleId: number;
};
export const {
  useApiServicesAppCorporatejobtitlelevelCreateorupdatePostMutation,
  useApiServicesAppCorporatejobtitlelevelGetallGetQuery,
} = injectedRtkApi;
