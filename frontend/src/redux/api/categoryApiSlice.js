import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../features/constants";
import { deleteCategory } from "../../../../backend/controllers/categoryController";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        createCategory: builder.mutation ({
            query: (newCategory) => ({
                url: `${CATEGORIES_URL}`,
                method: 'POST',
                body: newCategory
            }),
        }),
        
        updateCategory: builder.mutation({
            query: ({categoryId, updateCategory}) => ({
                url:`${CATEGORIES_URL}/${categoryId}`,
                method:'PUT',
                body: updateCategory
            })
        }),

        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url:`${CATEGORIES_URL}/${categoryId}`,
                method:'DELETE',
            })
        }),

        getAllCategories: builder.query({
            query: () => `${CATEGORIES_URL}/categories`,
        })
    }),
})

export const  { 
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery
} = categoryApiSlice;