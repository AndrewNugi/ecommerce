import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice"
import { useGetAllCategoriesQuery } from "../redux/api/categoryApiSlice"
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice"
import Loader from "../components/Loader"
import ProductCard from "./Products/ProductCard"

const Shop = () => {
    const dispatch = useDispatch()
    const { categories, products, checked, radio } = useSelector((state) => state.shop)
    const [priceFilter, setPriceFilter] = useState('')
    
    const categoriesQuery = useGetAllCategoriesQuery()
    const filteredProductsQuery = useGetFilteredProductsQuery({checked, radio})

    // Load categories
    useEffect(() => {
        if (!categoriesQuery.isLoading && categoriesQuery.data) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch])

    // Apply filtering when data is available or filters change
    useEffect(() => {
        if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
            let filteredProducts = filteredProductsQuery.data;
            
            // Apply price filter if it exists
            if (priceFilter.trim() !== '') {
                filteredProducts = filteredProducts.filter(product => {
                    return product.price.toString().includes(priceFilter) || 
                           product.price === parseInt(priceFilter, 10);
                });
            }
            
            // Always set products, regardless of checked or radio state
            dispatch(setProducts(filteredProducts));
            
            console.log("Filtering applied:", {
                dataLength: filteredProductsQuery.data.length,
                filteredLength: filteredProducts.length,
                checked,
                radio,
                priceFilter
            });
        }
    }, [filteredProductsQuery.data, filteredProductsQuery.isLoading, dispatch, priceFilter]);

    const handleBrandClick = (brand) => {
        if (!filteredProductsQuery.data) return;
        
        // Get all products by this brand
        const productsByBrand = filteredProductsQuery.data.filter(
            (product) => product.brand === brand
        );
        
        dispatch(setProducts(productsByBrand));
        console.log(`Brand filter applied: ${brand}`, productsByBrand.length);
    }

    const handleCheck = (value, id) => {
        const updatedChecked = value 
            ? [...checked, id] 
            : checked.filter((c) => c !== id);
            
        dispatch(setChecked(updatedChecked));
        console.log("Category filter updated:", updatedChecked);
    }

    // Get unique brands safely
    const uniqueBrands = 
        filteredProductsQuery.data 
            ? [...Array.from(
                new Set(
                    filteredProductsQuery.data
                    .map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
                )
            )]
            : [];

    const handlePriceChange = e => {
        setPriceFilter(e.target.value);
    }

    const handleReset = () => {
        window.location.reload();
    }
  
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Filters */}
                <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold text-center py-3 bg-gray-100 rounded-full mb-4">
                        Filter by Categories
                    </h2>
                    <div className="mb-6">
                        {categoriesQuery.isLoading ? (
                            <div className="flex justify-center"><Loader /></div>
                        ) : categories && categories.length > 0 ? (
                            categories.map((c) => (
                                <div key={c._id} className="mb-3">
                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            id={`category-${c._id}`} 
                                            onChange={e => handleCheck(e.target.checked, c._id)} 
                                            checked={checked.includes(c._id)}
                                            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded 
                                            focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 
                                            dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={`category-${c._id}`} className="ml-2 text-sm font-medium text-gray-700">
                                            {c.name}
                                        </label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center">No categories available</p>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-center py-3 bg-gray-100 rounded-full mb-4">
                        Filter By Brands
                    </h2>
                    <div className="mb-6">
                        {filteredProductsQuery.isLoading ? (
                            <div className="flex justify-center"><Loader /></div>
                        ) : uniqueBrands.length > 0 ? uniqueBrands.map((brand) => (
                            <div key={brand} className="flex items-center mb-3">
                                <input 
                                    type="radio" 
                                    id={`brand-${brand}`} 
                                    name="brand" 
                                    onChange={() => handleBrandClick(brand)} 
                                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded 
                                    focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 
                                    dark:bg-gray-700 dark:border-gray-600" 
                                />
                                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm font-medium text-gray-700">
                                    {brand}
                                </label>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500 text-center">No brands available</p>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-center py-3 bg-gray-100 rounded-full mb-4">
                        Filter by Price
                    </h2>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Enter Price"
                            value={priceFilter}
                            onChange={handlePriceChange}
                            className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
                        />
                    </div>

                    <button
                        className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        onClick={handleReset}
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Products Display */}
                <div className="w-full md:w-3/4">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {products?.length || 0} Products Found
                    </h2>
                    
                    {filteredProductsQuery.isLoading ? (
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    ) : products?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500">No products match your filters</p>
                            <button
                                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                                onClick={handleReset}
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products?.map((p) => (
                                <div key={p._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    {/* This is a placeholder for your ProductCard component */}
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Shop