import { Link, useParams } from "react-router-dom"
import Header from "../components/Header"
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Product from "./Products/Product"
import './Home.css'

const Home = () => {
    const {keyword} = useParams()
    const {data, isLoading, isError} = useGetProductsQuery({keyword})

    return  <>
            {!keyword ? <Header /> : null}
                {isLoading ? (
                    <Loader />
                ) : isError ? (
                    <Message variant='danger'>
                        {isError?.data?.message || isError.error}
                    </Message>
                ) : (
                    <>
                        <div className="home-container">
                            <h1 className="h1-style">
                                Special Products
                            </h1>
                            <Link 
                                to='/shop' 
                                className="btn-style"
                            >
                                Shop
                            </Link>
                        </div>
                        <div>
                            <div className="product-style">
                                {data.products.map((product) => (
                                    <div key={product._id}>
                                        <Product product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </>
                )}
        </>
}
export default Home
