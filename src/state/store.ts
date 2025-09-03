import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PreloadedState } from "redux";
import { baseApi as api } from "./services/baseApi";
import navReducer from "./features/nav/navSlice";
import authReducer from "./features/auth/authSlice";
import tenantReducer from "./features/tenant/tenantSlice";
import multiTenancyReducer from "./features/multiTenancy/multiTenancySlice";
import appStartReducer from "./features/appStart/appStartSlice";
import onboardingReducer from "./features/onboarding/onboardingSlice";
import finalizeSetupSlice from "./features/onboarding/finalizeSetupSlice";
import filterAndSortProviderReducer from "./features/provider/filterAndSortProvidersSlice";
import filterAndSortPlansReducer from "./features/plans/filterAndSortPlansSlice";
import newlyRegisteredTenantReducer from "./features/newlyRegisteredTenant/newlyRegisteredTenantSlice";

const rootReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  appStart: appStartReducer,
  tenant: tenantReducer,
  multiTenancy: multiTenancyReducer,
  [api.reducerPath]: api.reducer,
  onboarding: onboardingReducer,
  newlyRegisteredTenant: newlyRegisteredTenantReducer,
  finalize: finalizeSetupSlice,
  filterAndSortProvider: filterAndSortProviderReducer,
  filterAndSortPlans: filterAndSortPlansReducer,
});
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
