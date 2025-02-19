import { updateProduct } from "../../../../backend/controllers/productController.js";
import { PRODUCT_URL, UPLOAD_URL } from "../features/constants";
import { apiSlice } from './apiSlice.js'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}`,
                params:{ keyword },
            }),

            keepUnusedDataFor: 5,
            providesTags: ["Products"]
        }),

        getProductById: builder.query({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, productId) => [
                { type: "Products", id: productId },
            ]
        }),

        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/allProducts`
        }),

        getProductDetails: builder.query ({
            query: (productId) => ({
                url:`${PRODUCT_URL}/${productId}`
            })
        }),

        keepUnusedDataFor: 5,

        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: 'POST',
                body: productData,
            }),

            invalidatesTags: ["Products"],

        }),

        updateProduct: builder.mutation({
            query: ({productId, formData}) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'PUT',
                body: formData,
            }),
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url:`${PRODUCT_URL}/${productId}`,
                method: 'DELETE',
            }),
            provideTags: ["Products"],
        }),

        createReview: builder.mutation ({
            query: (data) => ({
                url:`${PRODUCT_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),

        }),

        getTopProduct: builder.query ({
            query: () => `${PRODUCT_URL}/topProduct`,
            keepUnusedDataFor: 5,
        }),

        getNewProduct: builder.query ({
            query: () => `${PRODUCT_URL}/newProduct`,
            keepUnusedDataFor: 5,
        }),
    }),
})

export const {
    useGetProductByIdQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useAllProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductQuery,
    useGetNewProductQuery,
    useUploadProductImageMutation,
    
} = productApiSlice