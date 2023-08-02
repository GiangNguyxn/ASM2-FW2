import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/product';


const productApi = createApi({
        reducerPath: 'products',
        tagTypes: ['Product'],
        baseQuery: fetchBaseQuery({
                baseUrl: "http://localhost:3000"
        }),
        endpoints: (builder) => ({
                getProducts: builder.query<IProduct[], void>({
                        query: () => `/products`,
                        providesTags: ['Product']
                }),
                getProductById: builder.query<any, number>({
                        query: (id: number) => `products/${id}`,
                        providesTags: ['Product']
                }),
                addProduct: builder.mutation<IProduct, IProduct>({
                        query: (product: IProduct) => ({
                                url: "/products",
                                method: "POST",
                                body: product
                        }),
                        invalidatesTags: ['Product']


                }),
                removeProduct: builder.mutation<any, number>({
                        query: (id: number) => ({
                                url: `/products/${id}`,
                                method: "DELETE",
                        }),
                        invalidatesTags: ['Product']
                }),
                updateProduct: builder.mutation({
                        query: (product: IProduct) => ({
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