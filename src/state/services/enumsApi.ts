import { baseApi as api } from './baseApi';
export const addTagTypes = ['Enums'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppEnumsGetplantypesGet: build.query<
        ApiServicesAppEnumsGetplantypesGetApiResponse,
        ApiServicesAppEnumsGetplantypesGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Enums/GetPlanTypes` }),
        providesTags: ['Enums'],
      }),
      apiServicesAppEnumsGetplancoverageGet: build.query<
        ApiServicesAppEnumsGetplancoverageGetApiResponse,
        ApiServicesAppEnumsGetplancoverageGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Enums/GetPlanCoverage` }),
        providesTags: ['Enums'],
      }),
      apiServicesAppEnumsGetgendertypeGet: build.query<
        ApiServicesAppEnumsGetgendertypeGetApiResponse,
        ApiServicesAppEnumsGetgendertypeGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Enums/GetGenderType` }),
        providesTags: ['Enums'],
      }),
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
      apiServicesAppEnumsGetpayablefrequencyGet: build.query<
        ApiServicesAppEnumsGetpayablefrequencyGetApiResponse,
        ApiServicesAppEnumsGetpayablefrequencyGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Enums/GetPayableFrequency` }),
        providesTags: ['Enums'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enumsApi };
export type ApiServicesAppEnumsGetplantypesGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetplantypesGetApiArg = void;
export type ApiServicesAppEnumsGetplancoverageGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetplancoverageGetApiArg = void;
export type ApiServicesAppEnumsGetgendertypeGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetgendertypeGetApiArg = void;
export type ApiServicesAppEnumsGetprovidertypesGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetprovidertypesGetApiArg = void;
export type ApiServicesAppEnumsGetproviderlevelsGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetproviderlevelsGetApiArg = void;
export type ApiServicesAppEnumsGetpayablefrequencyGetApiResponse =
  /** status 200 Success */ EnumValuesResponseDto[];
export type ApiServicesAppEnumsGetpayablefrequencyGetApiArg = void;
export type EnumValuesResponseDto = {
  label?: string | null;
  value?: string | null;
};
export const {
  useApiServicesAppEnumsGetplantypesGetQuery,
  useApiServicesAppEnumsGetplancoverageGetQuery,
  useApiServicesAppEnumsGetgendertypeGetQuery,
  useApiServicesAppEnumsGetprovidertypesGetQuery,
  useApiServicesAppEnumsGetproviderlevelsGetQuery,
  useApiServicesAppEnumsGetpayablefrequencyGetQuery,
} = injectedRtkApi;
