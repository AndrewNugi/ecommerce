import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"
import './Product.css'



const Product = ({ product }) => {
        return (
        <div className="product-container">
            <div className="relative">
                <img src={product.image} alt={product.name} className="prod-img"/>
                <HeartIcon product={product} /> 
            </div>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                <h2 className="prod-name-price">
                    <div className="prod-name">
                        {product.name}
                    </div>
                    <span className="prod-price">
                        ${product.price}
                    </span>
                </h2>
                </Link>
            </div>

        </div>
        )
        
}

export default Product
