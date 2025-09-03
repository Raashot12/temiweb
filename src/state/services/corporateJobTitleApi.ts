import { baseApi as api } from './baseApi';
export const addTagTypes = [
  'CorporateJobTitle',
  'CorporateJobTitleLevel',
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppCorporatejobtitleCreateorupdatePost: build.mutation<
        ApiServicesAppCorporatejobtitleCreateorupdatePostApiResponse,
        ApiServicesAppCorporatejobtitleCreateorupdatePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/CorporateJobTitle/CreateOrUpdate`,
          method: 'POST',
          body: queryArg.createCorporateJobTitleRequestDto,
        }),
        invalidatesTags: ['CorporateJobTitle'],
      }),
      apiServicesAppCorporatejobtitleGetallGet: build.query<
        ApiServicesAppCorporatejobtitleGetallGetApiResponse,
        ApiServicesAppCorporatejobtitleGetallGetApiArg
      >({
        query: () => ({ url: `/api/services/app/CorporateJobTitle/GetAll` }),
        providesTags: ['CorporateJobTitle'],
      }),
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
export { injectedRtkApi as corporateJobTitleApi };
export type ApiServicesAppCorporatejobtitleCreateorupdatePostApiResponse =
  /** status 200 Success */ CorporateJobTitleDto;
export type ApiServicesAppCorporatejobtitleCreateorupdatePostApiArg = {
  createCorporateJobTitleRequestDto: CreateCorporateJobTitleRequestDto;
};
export type ApiServicesAppCorporatejobtitleGetallGetApiResponse =
  /** status 200 Success */ CorporateJobTitleDto[];
export type ApiServicesAppCorporatejobtitleGetallGetApiArg = void;
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
export type CorporateJobTitleDto = {
  id?: number;
  name?: string | null;
  corporateEnrolmentId?: number;
};
export type CreateCorporateJobTitleRequestDto = {
  id?: number | null;
  name: string;
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
  useApiServicesAppCorporatejobtitleCreateorupdatePostMutation,
  useApiServicesAppCorporatejobtitleGetallGetQuery,
  useApiServicesAppCorporatejobtitlelevelCreateorupdatePostMutation,
  useApiServicesAppCorporatejobtitlelevelGetallGetQuery,
} = injectedRtkApi;
