import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../actions/Product";

const initialState = {
  products: [],
  isLoading: false,
  error: "",
} as { products: any[]; isLoading: boolean; error: string };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch product
    builder.addCase(getProducts.fulfilled, (state: any, action) => {
      state.products = action.payload;
    });
    //add product
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    //remove product
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    });
    //update products
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const product: any = action.payload;
      state.products = state.products.map((item) =>
        item.id === product.id ? product : item
      );
    });
  },
});

export const productReducer = productSlice.reducer;
