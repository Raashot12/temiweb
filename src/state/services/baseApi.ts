import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import * as z from "zod";
import Cookies from "js-cookie";

const abpApiResponseSchema = z.object({
  result: z.any().optional(),
  targetUrl: z.union([z.string(), z.null()]),
  success: z.boolean(),
  error: z.any().optional(),
  unAuthorizedRequest: z.boolean(),
  __abp: z.boolean(),
});

const tenantIdHeaderName = "Abp.TenantId";
const abpBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_API_SERVICE_BASE_URL,
    prepareHeaders(headers) {
      const accessToken = Cookies.get("accessToken");
      const tenantId = Cookies.get("Abp.TenantId");
      if (tenantId) {
        headers.set(tenantIdHeaderName, tenantId);
      }
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
  if (result.data) {
    const validatedResult = abpApiResponseSchema.parse(result.data);
    return { ...result, data: validatedResult.result };
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: abpBaseQuery,
  endpoints: () => ({}),
});
