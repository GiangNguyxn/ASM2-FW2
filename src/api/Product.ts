import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/product';
import { pause } from '../utils/pause';


const productApi = createApi({
        reducerPath: 'products',
        tagTypes: ['Product'],
        baseQuery: fetchBaseQuery({
                baseUrl: "http://localhost:3000",
                fetchFn:async(...arg)=>{
                        await pause(1000)
                        return fetch(...arg)
                }
        }),
        endpoints: (builder) => ({
                getProducts: builder.query<IProduct[], void>({
                        query: () => `/products`,
                        providesTags: ['Product']
                }),
                getProductById: builder.query<IProduct ,number| string>({
                        query: (id) => `products/${id}`,
                        providesTags: ['Product']
                }),
                addProduct: builder.mutation<IProduct, IProduct>({
                        query: (product) => ({
                                url: "/products",
                                method: "POST",
                                body: product
                        }),
                        invalidatesTags: ['Product']


                }),
                removeProduct: builder.mutation<void, number|string>({
                        query: (id) => ({
                                url: `/products/${id}`,
                                method: "DELETE",
                        }),
                        invalidatesTags: ['Product']
                }),
                updateProduct: builder.mutation<IProduct ,IProduct>({
                        query: (product) => ({
                                url: `/products//${product.id}`,
                                method: "PATCH",
                                body: product
                        }),
                        invalidatesTags: ['Product']
                })
        })
})


export const productReducer = productApi.reducer
export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation, useRemoveProductMutation, useUpdateProductMutation } = productApi
export default productApi