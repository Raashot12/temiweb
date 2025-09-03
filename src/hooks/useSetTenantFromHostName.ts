import { useEffect } from "react";
import Cookies from "js-cookie";
import { setMultiTenancySide } from "state/features/multiTenancy/multiTenancySlice";
import { setTenant } from "state/features/tenant/tenantSlice";
import { useAppDispatch } from "@/state/hooks";
import { useApiServicesAppAccountIstenantavailablePostMutation } from "state/services/accountApi";
import { setAppStatusReady } from "state/features/appStart/appStartSlice";

const staticBaseUrl = "insurance-app.plateaumed-dev.com/";
const baseUrl = process.env.NEXT_PUBLIC_APP_HOST_URL ?? staticBaseUrl;

export const useSetTenantFromHostName = () => {
  const [checkTenant, { isError, isLoading }] =
    useApiServicesAppAccountIstenantavailablePostMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const setTenantAvailability = async (tenancyName: string) => {
      try {
        const result = await checkTenant({
          isTenantAvailableInput: {
            tenancyName,
          },
        }).unwrap();
        if (result.tenantId) {
          Cookies.set("Abp.TenantId", result.tenantId.toString(), {
            expires: 90,
          });
          dispatch(setMultiTenancySide("TENANT"));
          const tenant = {
            name: tenancyName,
            id: result.tenantId,
            isActive: result.state === 1,
          };
          dispatch(setTenant(tenant));
          dispatch(setAppStatusReady());
          return;
        }
        if (result.state === 3) {
          window.location.replace(`${baseUrl}/signup`);
          dispatch(setAppStatusReady());
          return;
        }
        dispatch(setAppStatusReady());
      } catch (error) {
        dispatch(setAppStatusReady());
      }
    };

    if (typeof window !== "undefined") {
      // TODO: remove comment after demo
      // const { hostname } = window.location;
      let tenancyName;
      // if (process.env.NODE_ENV === "development") {
      tenancyName = process.env.NEXT_PUBLIC_DEV_TENANCY_NAME;
      // }

      // else {
      //   tenancyName = getTenantNameFromHostName(hostname, baseUrl);
      // }

      if (tenancyName === "" || tenancyName === undefined) {
        dispatch(setMultiTenancySide("HOST"));
        dispatch(setAppStatusReady());
      } else {
        setTenantAvailability(tenancyName);
      }
    }
  }, [checkTenant, dispatch]);
  return { isError, isLoading };
};
