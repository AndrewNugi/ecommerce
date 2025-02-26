import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaTrash } from "react-icons/fa"
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice"
import { useEffect } from "react"

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // Debug cart items when they change
  useEffect(() => {
    console.log('Cart items:', cartItems)
  }, [cartItems])

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({...product, qty}))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }
  
  return (
    <div className="container mx-auto mt-8 px-4">
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to='/shop' className="bg-pink-500 py-2 px-4 rounded-full text-white hover:bg-pink-600 transition">
            Go back to Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow ml-4 mt-2 sm:mt-0">
                  <Link to={`/product/${item._id}`} className="text-lg font-medium hover:underline">
                    {item.name}
                  </Link>
                  
                  <div className="text-gray-600 mt-1">{item.brand}</div>
                  <div className="font-bold mt-1">${item.price.toFixed(2)}</div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="w-24">
                      <select 
                        value={item.qty} 
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        className="w-full p-1 border rounded text-black"
                      >
                        {Array.from(
                          { length: Math.min(Math.max(1, item.countInStock || 0), 10) }, 
                          (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    
                    <button 
                      className="text-red-500 p-2 hover:bg-red-50 rounded-full transition"
                      onClick={() => removeFromCartHandler(item._id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex justify-between mb-2">
                <span>Items:</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
              
              <div className="border-t my-4 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-white w-full hover:bg-pink-600 transition"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart