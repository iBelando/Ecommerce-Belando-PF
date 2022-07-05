import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../../Data/Products";

const initialState = {
  value: {
    products: PRODUCTS,
    productsByCategory: [],
    productSelected: {},
  },
};
export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductsByCategory: (state, action) => {
      const productsfiltered = state.value.products.filter(
        (product) => product.category === action.payload
      );
      state.value.productsByCategory = productsfiltered;
    },
    setProductSelected: (state, action) => {
      const productSelected = state.value.productsByCategory.find(
        (product) => product.id === action.payload
      );
      state.value.productSelected = productSelected;
    },
  },
});

export const { setProductsByCategory, setProductSelected } =
  productsSlice.actions;

export default productsSlice.reducer;
