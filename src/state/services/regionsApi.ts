import { baseApi as api } from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiServicesAppRegionsGetallGet: build.query<
      ApiServicesAppRegionsGetallGetApiResponse,
      ApiServicesAppRegionsGetallGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Regions/GetAll`,
        params: {
          Filter: queryArg.filter,
          CountryCodeFilter: queryArg.countryCodeFilter,
          Sorting: queryArg.sorting,
          SkipCount: queryArg.skipCount,
          MaxResultCount: queryArg.maxResultCount,
        },
      }),
    }),
    apiServicesAppRegionsGetregionsGet: build.query<
      ApiServicesAppRegionsGetregionsGetApiResponse,
      ApiServicesAppRegionsGetregionsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Regions/GetRegions`,
        params: {
          Filter: queryArg.filter,
          CountryCodeFilter: queryArg.countryCodeFilter,
        },
      }),
    }),
    apiServicesAppRegionsGetregionsbycountryidGet: build.query<
      ApiServicesAppRegionsGetregionsbycountryidGetApiResponse,
      ApiServicesAppRegionsGetregionsbycountryidGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Regions/GetRegionsByCountryId`,
        params: { input: queryArg.input },
      }),
    }),
    apiServicesAppRegionsCreateoreditPost: build.mutation<
      ApiServicesAppRegionsCreateoreditPostApiResponse,
      ApiServicesAppRegionsCreateoreditPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Regions/CreateOrEdit`,
        method: 'POST',
        body: queryArg.createOrEditRegionDto,
      }),
    }),
    apiServicesAppRegionsGetregionforeditGet: build.query<
      ApiServicesAppRegionsGetregionforeditGetApiResponse,
      ApiServicesAppRegionsGetregionforeditGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Regions/GetRegionForEdit`,
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppRegionsDeleteDelete: build.mutation<
      ApiServicesAppRegionsDeleteDeleteApiResponse,
      ApiServicesAppRegionsDeleteDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Regions/Delete`,
        method: 'DELETE',
        params: { Id: queryArg.id },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as regionApi };
export type ApiServicesAppRegionsGetallGetApiResponse =
  /** status 200 OK */ PagedResultDtoOfGetRegionForViewDto;
export type ApiServicesAppRegionsGetallGetApiArg = {
  filter?: string;
  countryCodeFilter?: string;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
};
export type ApiServicesAppRegionsGetregionsGetApiResponse =
  /** status 200 OK */ ListResultDtoOfGetRegionsForListDto;
export type ApiServicesAppRegionsGetregionsGetApiArg = {
  filter?: string;
  countryCodeFilter?: string;
};
export type ApiServicesAppRegionsGetregionsbycountryidGetApiResponse =
  /** status 200 OK */ GetRegionByCountryIdOutput[];
export type ApiServicesAppRegionsGetregionsbycountryidGetApiArg = {
  input?: number;
};
export type ApiServicesAppRegionsCreateoreditPostApiResponse = unknown;
export type ApiServicesAppRegionsCreateoreditPostApiArg = {
  createOrEditRegionDto: CreateOrEditRegionDto;
};
export type ApiServicesAppRegionsGetregionforeditGetApiResponse =
  /** status 200 OK */ GetRegionForEditOutput;
export type ApiServicesAppRegionsGetregionforeditGetApiArg = {
  id?: number;
};
export type ApiServicesAppRegionsDeleteDeleteApiResponse = unknown;
export type ApiServicesAppRegionsDeleteDeleteApiArg = {
  id?: number;
};
export type RegionDto = {
  name?: string | null;
  shortName?: string | null;
  countryCode?: string | null;
  id?: number;
};
export type GetRegionForViewDto = {
  region?: RegionDto;
};
export type PagedResultDtoOfGetRegionForViewDto = {
  totalCount?: number;
  items?: GetRegionForViewDto[] | null;
};
export type GetRegionsForListDto = {
  id?: number;
  name?: string | null;
  shortName?: string | null;
  countryCode?: string | null;
};
export type ListResultDtoOfGetRegionsForListDto = {
  items?: GetRegionsForListDto[] | null;
};
export type GetRegionByCountryIdOutput = {
  name?: string | null;
  id?: number;
};
export type CreateOrEditRegionDto = {
  name: string;
  shortName?: string | null;
  countryId: string;
  id?: number | null;
};
export type GetRegionForEditOutput = {
  region?: CreateOrEditRegionDto;
};
export const {
  useApiServicesAppRegionsGetallGetQuery,
  useApiServicesAppRegionsGetregionsGetQuery,
  useApiServicesAppRegionsGetregionsbycountryidGetQuery,
  useApiServicesAppRegionsCreateoreditPostMutation,
  useApiServicesAppRegionsGetregionforeditGetQuery,
  useApiServicesAppRegionsDeleteDeleteMutation,
} = injectedRtkApi;
