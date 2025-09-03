import { baseApi as api } from "./baseApi";
export const addTagTypes = ["Locations"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppLocationsCreatecountryPost: build.mutation<
        ApiServicesAppLocationsCreatecountryPostApiResponse,
        ApiServicesAppLocationsCreatecountryPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Locations/CreateCountry`,
          method: "POST",
          body: queryArg.createCountryRequestDto,
        }),
        invalidatesTags: ["Locations"],
      }),
      apiServicesAppLocationsGetcountriesGet: build.query<
        ApiServicesAppLocationsGetcountriesGetApiResponse,
        ApiServicesAppLocationsGetcountriesGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Locations/GetCountries` }),
        providesTags: ["Locations"],
      }),
      apiServicesAppLocationsCreateregionPost: build.mutation<
        ApiServicesAppLocationsCreateregionPostApiResponse,
        ApiServicesAppLocationsCreateregionPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Locations/CreateRegion`,
          method: "POST",
          body: queryArg.createRegionRequestDto,
        }),
        invalidatesTags: ["Locations"],
      }),
      apiServicesAppLocationsGetregionsGet: build.query<
        ApiServicesAppLocationsGetregionsGetApiResponse,
        ApiServicesAppLocationsGetregionsGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Locations/GetRegions` }),
        providesTags: ["Locations"],
      }),
      apiServicesAppLocationsCreatedistrictPost: build.mutation<
        ApiServicesAppLocationsCreatedistrictPostApiResponse,
        ApiServicesAppLocationsCreatedistrictPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Locations/CreateDistrict`,
          method: "POST",
          body: queryArg.createDistrictRequestDto,
        }),
        invalidatesTags: ["Locations"],
      }),
      apiServicesAppLocationsGetdistrictsGet: build.query<
        ApiServicesAppLocationsGetdistrictsGetApiResponse,
        ApiServicesAppLocationsGetdistrictsGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Locations/GetDistricts` }),
        providesTags: ["Locations"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as locationApi };
export type ApiServicesAppLocationsCreatecountryPostApiResponse = unknown;
export type ApiServicesAppLocationsCreatecountryPostApiArg = {
  createCountryRequestDto: CreateCountryRequestDto;
};
export type ApiServicesAppLocationsGetcountriesGetApiResponse =
  /** status 200 Success */ GetCountryResponseDto[];
export type ApiServicesAppLocationsGetcountriesGetApiArg = void;
export type ApiServicesAppLocationsCreateregionPostApiResponse = unknown;
export type ApiServicesAppLocationsCreateregionPostApiArg = {
  createRegionRequestDto: CreateRegionRequestDto;
};
export type ApiServicesAppLocationsGetregionsGetApiResponse =
  /** status 200 Success */ GetRegionsResponseDto[];
export type ApiServicesAppLocationsGetregionsGetApiArg = void;
export type ApiServicesAppLocationsCreatedistrictPostApiResponse = unknown;
export type ApiServicesAppLocationsCreatedistrictPostApiArg = {
  createDistrictRequestDto: CreateDistrictRequestDto;
};
export type ApiServicesAppLocationsGetdistrictsGetApiResponse =
  /** status 200 Success */ GetDistrictsResponseDto[];
export type ApiServicesAppLocationsGetdistrictsGetApiArg = void;
export type CreateCountryRequestDto = {
  name: string;
  nationality: string;
  code: string;
  phoneCode: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
};
export type GetCountryResponseDto = {
  id?: number;
  name?: string | null;
  nationality?: string | null;
  code?: string | null;
  phoneCode?: string | null;
  currency?: string | null;
  currencyCode?: string | null;
  currencySymbol?: string | null;
};
export type CreateRegionRequestDto = {
  name: string;
  shortName?: string | null;
  countryId: number;
};
export type GetRegionsResponseDto = {
  id?: number;
  name?: string | null;
  countryId?: number;
  shortName?: string | null;
  country?: string | null;
};
export type CreateDistrictRequestDto = {
  name: string;
  regionId: number;
};
export type GetDistrictsResponseDto = {
  id?: number;
  name?: string | null;
  regionId?: number;
  region?: string | null;
};
export const {
  useApiServicesAppLocationsCreatecountryPostMutation,
  useApiServicesAppLocationsGetcountriesGetQuery,
  useApiServicesAppLocationsCreateregionPostMutation,
  useApiServicesAppLocationsGetregionsGetQuery,
  useApiServicesAppLocationsCreatedistrictPostMutation,
  useApiServicesAppLocationsGetdistrictsGetQuery,
} = injectedRtkApi;
