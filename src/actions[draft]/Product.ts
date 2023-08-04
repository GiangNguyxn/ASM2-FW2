import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios[draft]/config";

export const getProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const data = await instance.get("/products");
    return data;
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product: any) => {
    const data = await instance.post("/products", product);
    return data;
  }
);
export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (id: any) => {
    await instance.delete(`/products/${id}`);
    return id;
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product: any) => {
    const data = await instance.patch(`/products/${product.id}`, product);
    return data;
  }
);
