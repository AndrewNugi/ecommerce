import { useGetTopProductQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from "moment"
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa"

const ProductCarousel = () => {

    const {data: products, isLoading, error} = useGetTopProductQuery()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed:3000,
    }
  
  
    return <div className="mb-4 xl:block lg:block md:block">
        {isLoading ? null: error ? (
            <Message variant='danger'>
                {error?.data?.message || error.message}
            </Message>
        ) : <Slider {...settings} className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block">

            {
                products.map(({image, _id, name, price, description, brand, numReviews, rating, quantity,countInStock, createdAt}) => (
                    <div key={_id}>
                        <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]" />
                        <div className="flex justify-between w-[20rem]">
                            <div className="one">
                                <h1>{name}</h1>
                                <p>{price}</p><br />
                                <p className="w-[25rem]">{description.substring(0,170)}...</p>
                            </div>
                            <div className="flex justify-between w-[20rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6 w-[8rem]">
                                        <FaStore className="mr-2 text-black"/> Brand: {brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[8rem]">
                                        <FaStore className="mr-2 text-black"/> Reviews: {numReviews}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[8rem]">
                                        <FaStore className="mr-2 text-black"/> Added: {moment(createdAt).fromNow()}
                                    </h1>
                                </div>
                                <div className="two">
                                    <div className="flex items-center mb-6">
                                        <FaStar className="mr-2 text-black w-[3rem]"/>Ratings: {" "}{Math.round(rating)}
                                    </div>
                                    <div className="flex items-center mb-6">
                                        <FaShoppingCart className="mr-2 text-black w-[3rem]"/>Quantity: {quantity}
                                    </div>
                                    <div className="flex items-center mb-6">
                                        <FaBox className="mr-2 text-black w-[3rem]"/>Count In Stock: {countInStock}
                                    </div>
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
