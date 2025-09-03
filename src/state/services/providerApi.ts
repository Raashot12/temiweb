import { baseApi as api } from './baseApi';
export const addTagTypes = ['Enums', 'Provider', 'TokenAuth'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppEnumsGetprovidertypesGet: build.query<
        ApiServicesAppEnumsGetprovidertypesGetApiResponse,
        ApiServicesAppEnumsGetprovidertypesGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Enums/GetProviderTypes` }),
        providesTags: ['Enums'],
      }),
      apiServicesAppEnumsGetproviderlevelsGet: build.query<
        ApiServicesAppEnumsGetproviderlevelsGetApiResponse,
        ApiServicesAppEnumsGetproviderlevelsGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Enums/GetProviderLevels` }),
        providesTags: ['Enums'],
      }),
      apiServicesAppProviderCreateproviderPost: build.mutation<
        ApiServicesAppProviderCreateproviderPostApiResponse,
        ApiServicesAppProviderCreateproviderPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Provider/CreateProvider`,
          method: 'POST',
          body: queryArg.createProviderDto,
        }),
        invalidatesTags: ['Provider'],
      }),
      apiServicesAppProviderCreateproviderfromcsvPost: build.mutation<
        ApiServicesAppProviderCreateproviderfromcsvPostApiResponse,
        ApiServicesAppProviderCreateproviderfromcsvPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Provider/CreateProviderFromCsv`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['Provider'],
      }),
      apiServicesAppProviderGetproviderlistGet: build.query<
        ApiServicesAppProviderGetproviderlistGetApiResponse,
        ApiServicesAppProviderGetproviderlistGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Provider/GetProviderList`,
          params: {
            Filter: queryArg.filter,
            ProviderType: queryArg.providerType,
            CountryId: queryArg.countryId,
            StateId: queryArg.stateId,
            TierId: queryArg.tierId,
            SortByDescending: queryArg.sortByDescending,
            Sorting: queryArg.sorting,
            SkipCount: queryArg.skipCount,
            MaxResultCount: queryArg.maxResultCount,
          },
        }),
        providesTags: ['Provider'],
      }),
      apiServicesAppProviderGetproviderlocationGet: build.query<
        ApiServicesAppProviderGetproviderlocationGetApiResponse,
        ApiServicesAppProviderGetproviderlocationGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Provider/GetProviderLocation`,
          params: { searchTerm: queryArg.searchTerm },
        }),
        providesTags: ['Provider'],
      }),
      apiServicesAppProviderUpdateproviderPut: build.mutation<
        ApiServicesAppProviderUpdateproviderPutApiResponse,
        ApiServicesAppProviderUpdateproviderPutApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Provider/UpdateProvider`,
          method: 'PUT',
          body: queryArg.createProviderDto,
        }),
        invalidatesTags: ['Provider'],
      }),
      apiTokenauthGetexternalauthenticationprovidersGet: build.query<
        ApiTokenauthGetexternalauthenticationprovidersGetApiResponse,
        ApiTokenauthGetexternalauthenticationprovidersGetApiArg
      >({
        query: () => ({
          url: `/api/TokenAuth/GetExternalAuthenticationProviders`,
        }),
        providesTags: ['TokenAuth'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as providerApi };
export type ApiServicesAppEnumsGetprovidertypesGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetprovidertypesGetApiArg = void;
export type ApiServicesAppEnumsGetproviderlevelsGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetproviderlevelsGetApiArg = void;
export type ApiServicesAppProviderCreateproviderPostApiResponse = unknown;
export type ApiServicesAppProviderCreateproviderPostApiArg = {
  createProviderDto: CreateProviderDto;
};
export type ApiServicesAppProviderCreateproviderfromcsvPostApiResponse =
  /** status 200 Success */ CreateProviderFromCsvResponseDto;
export type ApiServicesAppProviderCreateproviderfromcsvPostApiArg = {
  body: {
    TenantId?: number;
    CsvFile?: Blob;
  };
};
export type ApiServicesAppProviderGetproviderlistGetApiResponse =
  /** status 200 Success */ PagedResultDtoOfGetProviderListResponseDto;
export type ApiServicesAppProviderGetproviderlistGetApiArg = {
  filter?: string;
  providerType?: ProviderType;
  countryId?: number;
  stateId?: number;
  tierId?: number;
  sortByDescending?: boolean;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
};
export type ApiServicesAppProviderGetproviderlocationGetApiResponse =
  /** status 200 Success */ GetProviderLocationsResponseDto[];
export type ApiServicesAppProviderGetproviderlocationGetApiArg = {
  searchTerm?: string;
};
export type ApiServicesAppProviderUpdateproviderPutApiResponse =
  /** status 200 Success */ CreateProviderDto;
export type ApiServicesAppProviderUpdateproviderPutApiArg = {
  createProviderDto: CreateProviderDto;
};
export type ApiTokenauthGetexternalauthenticationprovidersGetApiResponse =
  /** status 200 Success */ ExternalLoginProviderInfoModel[];
export type ApiTokenauthGetexternalauthenticationprovidersGetApiArg = void;
export type EnumValuesResponseDto = {
  label?: string | null;
  value?: string | null;
};
export type ProviderType = 'Private' | 'Public';
export type ProviderLevel = 'Primary' | 'Secondary' | 'Tertiary';
export type CreateProviderDto = {
  tenantId?: number;
  name?: string | null;
  type?: ProviderType;
  level?: ProviderLevel;
  countryId?: number;
  address?: string | null;
  regionId?: number;
  city?: string | null;
  tierIds?: number[] | null;
  id?: number;
};
export type CreateProviderFromCsvResponseDto = {
  validItemsCount?: number;
  failedUploadMessages?: string[] | null;
};
export type TierDto = {
  tenantId?: number;
  tierName?: string | null;
  id?: number | null;
};
export type GetProviderListResponseDto = {
  name?: string | null;
  state?: string | null;
  tiers?: TierDto[] | null;
  enroleeCount?: number;
  id?: number;
};
export type PagedResultDtoOfGetProviderListResponseDto = {
  totalCount?: number;
  items?: GetProviderListResponseDto[] | null;
};
export type GetProviderLocationsResponseDto = {
  state?: string | null;
  city?: string | null;
  stateId?: number;
};
export type ExternalLoginProviderInfoModel = {
  name?: string | null;
  clientId?: string | null;
  additionalParams?: {
    [key: string]: string | null;
  } | null;
};
export const {
  useApiServicesAppEnumsGetprovidertypesGetQuery,
  useApiServicesAppEnumsGetproviderlevelsGetQuery,
  useApiServicesAppProviderCreateproviderPostMutation,
  useApiServicesAppProviderCreateproviderfromcsvPostMutation,
  useApiServicesAppProviderGetproviderlistGetQuery,
  useApiServicesAppProviderGetproviderlocationGetQuery,
  useApiServicesAppProviderUpdateproviderPutMutation,
  useApiTokenauthGetexternalauthenticationprovidersGetQuery,
} = injectedRtkApi;
