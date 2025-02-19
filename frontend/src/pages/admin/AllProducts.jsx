import { Link } from "react-router-dom"
import moment from "moment"
import { useAllProductsQuery } from "../../redux/api/productApiSlice"
import AdminMenu from "./AdminMenu"
import Loader from "../../components/Loader"
import './AllProducts.css'

const AllProducts = () => {
    const {data: products, isLoading, isError} = useAllProductsQuery()

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <div>Error loading products</div>
    }

    return (
        <div className="products-container">
            <div className="products-layout">
                <div className="products-content">
                    <div className="products-header">
                        All products ({products.length})
                    </div>

                    <div className="products-grid">
                        {products.map((product) => (
                            <Link key={product._id} 
                                  to={`/admin/product/update/${product._id}`} 
                                  className="product-card">
                                <div className="product-content">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="product-image" 
                                    />

                                    <div className="product-details">
                                        <div className="product-header">
                                            <h1 className="product-title">
                                                {product?.name}
                                            </h1>
                                            <p className="product-date">
                                                {moment(product.createAt).format("MMM Do YY")}
                                            </p>
                                        </div>

                                        <p className="product-description">
                                            {product?.description?.substring(0, 160)}...
                                        </p>

                                        <div className="product-footer">
                                            <Link to={`/admin/product/update/${product._id}`} 
                                                  className="update-link">
                                                Update product
                                                <svg 
                                                    className="update-icon"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                </svg>
                                            </Link>
                                            <p className="product-price">${product?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="admin-menu-container">
                    <AdminMenu />
                </div>
            </div>
        </div>
    )
}

export default AllProducts