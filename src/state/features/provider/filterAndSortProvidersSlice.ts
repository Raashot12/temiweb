import { ProvidersType } from "@/types/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SortBy = { field: keyof ProvidersType; desc: boolean };

interface FilterAndSortProviderType {
  searchQuery: string | null;
  providerType: string | null;
  countryId: string | null;
  stateId: string | null;
  tierId: string | null;
  sortBy?: SortBy;
}

const initialState: FilterAndSortProviderType = {
  searchQuery: null,
  providerType: "null",
  countryId: "null",
  stateId: "null",
  tierId: "null",
  sortBy: undefined,
};

const filterAndSortProviderSlice = createSlice({
  name: "filterAndSortProvider",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string | null>) {
      state.searchQuery = action.payload;
    },
    setProviderType(state, action: PayloadAction<string | null>) {
      state.providerType = action.payload;
    },
    setCountryId(state, action: PayloadAction<string | null>) {
      state.countryId = action.payload;
    },
    setStateId(state, action: PayloadAction<string | null>) {
      state.stateId = action.payload;
    },
    setTierId(state, action: PayloadAction<string | null>) {
      state.tierId = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy | undefined>) {
      state.sortBy = action.payload;
    },
    resetFilterAndSortBySlice: () => initialState,
  },
});

export const {
  setSearchQuery,
  setProviderType,
  setCountryId,
  setStateId,
  setTierId,
  resetFilterAndSortBySlice,
  setSortBy,
} = filterAndSortProviderSlice.actions;
export default filterAndSortProviderSlice.reducer;
