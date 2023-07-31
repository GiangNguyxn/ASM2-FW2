// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const productApi = createApi({
//         reducerPath: "products",
//         baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:3000",
//         fetchFn: async (...args: any) => {
//         return fetch(args);
//         },
//         }),
//         endpoints(builder) {
//         return {
//         fetchProduct: builder.query({
//                 query: () => {
//                 return {
//                 url: "/products",
//                 method: "GET",
//                 };
//                 },
//         }),
//         };
//         },
//         });

// export const {
//         useFetchProductsQuery
// } = productApi

// export default productApi
