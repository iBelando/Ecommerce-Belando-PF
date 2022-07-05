import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../../Data/Products";
import { DB_URL } from "../../Constants/firebase";
import { useSelector } from "react-redux";

const initialState = {
  value: {
    cart: [],
    response: {},
    loading: false,
    error: false,
  },
};
const total2 = () => {
  for (let index = 0; index < cantidadItems.length; index++) {
    const element = array[index];
  }
};

export const confirmPurchase = createAsyncThunk(
  "cart/confirm",
  async ({ items, total, userId }) => {
    try {
      const res = await fetch(`${DB_URL}orders/${userId}.json`, {
        method: "POST",
        body: JSON.stringify({
          date: new Date().toLocaleDateString(),
          total,
          items,
        }),
      });
      const data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue("Opps, ha ocurrido un error");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const productoRepetido = state.value.cart.find(
        (producto) => producto.id === action.payload.id
      );
      if (productoRepetido) {
        state.value.cart.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity++;
            return item;
          }
        });
      } else {
        const producto = PRODUCTS.find(
          (producto) => producto.id === action.payload.id
        );
        state.value.cart.push({ ...producto, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const productoRepetido = state.value.cart.find(
        (producto) => producto.id === action.payload.id
      );

      if (productoRepetido) {
        const indice = state.value.cart.findIndex(
          (producto) => producto.id === action.payload.id
        );
        state.value.cart.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity--;
            if (item.quantity == 0) {
              state.value.cart.splice(indice, 1);
            }
            return item;
          }
        });
      } else {
        const producto = PRODUCTS.find(
          (producto) => producto.id === action.payload.id
        );
        state.value.cart.push({ ...producto, quantity: 1 });
      }
    },

    clear: (state) => {
      state.value.cart = [];
    },
  },

  extraReducers: {
    [confirmPurchase.pending]: (state) => {
      state.value.loading = true;
    },
    [confirmPurchase.fulfilled]: (state, { payload }) => {
      state.value.response = payload;
      state.value.loading = false;
    },
    [confirmPurchase.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { addItem, removeItem, clear } = cartSlice.actions;

export default cartSlice.reducer;
