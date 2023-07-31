import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  carts: [],
};
const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    add: (state: any, action) => {
      const newProduct: any = action.payload;
      const exitProductIndex = state.carts.findIndex(
        (item: any) => item.id == newProduct.id
      );
      if (exitProductIndex == -1) {
        state.carts.push(newProduct);
      } else {
        state.carts[exitProductIndex].quantity++;
      }
    },
    increase(state: any, action) {
      state.carts.find((item: any) => item.id == action.payload).quantity++;
    },
    decrease(state: any, action) {
      const currentProduct = state.carts.find(
        (item: any) => item.id == action.payload
      );
      currentProduct.quantity--;
      if (currentProduct.quantity < 1) {
        const confirm = window.confirm("Are you sure you want to decrease");
        confirm
          ? state.carts.filter((item: any) => item.id != action.payload)
          : (currentProduct.quantity = 1);
      }
    },
  },
});
export const { add, increase, decrease } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
