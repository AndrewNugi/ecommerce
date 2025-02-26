import { useGetTopProductQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from "moment"
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa"
import './ProductCarousel.css'

const ProductCarousel = () => {

    const {data: products, isLoading, error} = useGetTopProductQuery()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        autoplaySpeed:3000,
    }
  
  
    return <div className="carousel-container">
        {isLoading ? null: error ? (
            <Message variant='danger'>
                {error?.data?.message || error.message}
            </Message>
        ) : <Slider {...settings} className="carousel-slider">

            {
                products.map(({image, _id, name, price, description, brand, numReviews, rating, quantity,countInStock, createdAt}) => (
                    <div key={_id}>
                        <img src={image} alt={name} className="carousel-img" />
                        <div className="carousel-name-price">
                            <div className="one">
                                <h1>{name}</h1>
                                <p>${price}</p><br />
                                <p className="">{description.substring(0,170)}...</p>
                            </div>
                            <div className="info-container">
                                <div className="one">
                                    <h1 className="carousel-info">
                                        <FaStore className="icon-style"/> Brand: {brand}
                                    </h1>
                                    <h1 className="carousel-info">
                                        <FaStar className="icon-style"/> Reviews: {numReviews}
                                    </h1>
                                    <h1 className="carousel-info">
                                        <FaClock className="icon-style"/> Added: {moment(createdAt).fromNow()}
                                    </h1>
                                </div>
                                <div className="one">
                                    <h1 className="carousel-info">
                                    <FaStar className="icon-style"/>Ratings: {" "}{Math.round(rating)}
                                    </h1>
                                    <h1 className="carousel-info">
                                    <FaShoppingCart className="icon-style"/>Quantity: {quantity}
                                    </h1>
                                    <h1 className="carousel-info">
                                    <FaBox className="icon-style"/>Count In Stock: {countInStock}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Slider>
    }
    </div>
}

export default ProductCarousel
