import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_URL } from "../../Constants/firebase";
import axios from "axios";

const initialState = {
  value: {
    orders: [],
    loading: false,
    error: false,
  },
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (userId) => {
    try {
      const { data } = await axios.get(`${DB_URL}orders/${userId}.json`);
      if (data === null) {
        throw new Error("Usted aún no cuenta con órdenes");
      }
      return data;
    } catch (error) {
      return rejectWithValue("Ups, ha ocurrdo un error");
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (userId, order) => {
    try {
      const { data } = await axios.post(
        `${DB_URL}orders/${userid}.json`,
        order
      );
      if (data === null) {
        throw new Error("No se ha podido crear la órden!");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Ups, ha ocurrdo un error");
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.value.loading = true;
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.orders = Object.entries(payload).map((item) => {
        return {
          id: item[0],
          ...item[1],
        };
      });
    },
    [getOrders.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
    [createOrder.pending]: (state) => {
      state.status = Status.loading;
    },
    [createOrder.fulfilled]: (state) => {
      state.status = Status.success;
    },
    [createOrder.rejected]: (state, payload) => {
      state.status = Status.failed;
      state.error = payload.error.message;
    },
  },
});

export default ordersSlice.reducer;
