import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES } from "../../Data/Categories";

const initialState = {
  value: {
    categories: CATEGORIES,
    categorySelected: "",
  },
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    selectCategory: (state, action) => {
      const categorySelected = state.value.categories.find(
        (category) => category.id === action.payload
      );
      state.value.categorySelected = categorySelected.category;
    },
  },
});

export const { selectCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
