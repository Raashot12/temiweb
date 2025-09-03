import { PlansDataType } from "@/types/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SortBy = { field: keyof PlansDataType; desc: boolean };

interface FilterAndSortPlansType {
  searchQuery: string | null;
  tierId: string | null;
  sortBy?: SortBy;
}

const initialState: FilterAndSortPlansType = {
  searchQuery: null,
  tierId: "null",
  sortBy: undefined,
};

const filterAndSortPlansSlice = createSlice({
  name: "filterAndSortPlans",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string | null>) {
      state.searchQuery = action.payload;
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
  setTierId,
  resetFilterAndSortBySlice,
  setSortBy,
} = filterAndSortPlansSlice.actions;
export default filterAndSortPlansSlice.reducer;
