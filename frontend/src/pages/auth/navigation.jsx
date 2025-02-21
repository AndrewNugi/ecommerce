import { useState } from "react"
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai"
import { FaHeart } from "react-icons/fa"   
import { Link } from "react-router-dom"
import './navigation.css'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../../redux/api/usersApiSlice"
import { logout } from "../../redux/features/auth/authSlice"
import FavoritesCount from "../Products/FavoritesCount"

const Navigation = () => {
    const {userInfo} = useSelector(state => state.auth)

    const [ dropdownOpen, setDropdownOpen ] = useState(false)
    const [ showSidebar, setShowSidebar ] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const closeSidebar = () => {
        setShowSidebar(false)
    }
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }


    return ( 
    <div 
    style={{zIndex: 999}} 
    className={`${showSidebar ? "hidden" : "flex "} xl:flex lg:flex md:hidden sm:hidden flex-col 
    justify-between p-4 text-white bg-black w-[5%] 
    hover:w-[10%] h-[100vh] fixed `}  id="navigation-container"  
    >
        <div className="flex flex-col justify-center space-y-4" >
            <Link to='/' className="flex items-center transition-transform transform hover:translate-x-3" >

                <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">HOME</span>{""}
            </Link>
            <Link to='/shop' className="flex items-center transition-transform transform hover:translate-x-3" >

                <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{""}
            </Link>
            <Link to='/cart' className="flex items-center transition-transform transform hover:translate-x-3" >

                <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">CART</span>{""}
            </Link>
            <Link to='/favorite' className="flex items-center transition-transform transform hover:translate-x-3" >

                <FaHeart className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">FAVS</span>{""}
                <FavoritesCount />
            </Link>
        </div>

        <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center text-black-8000 focus:outline-none">
                {userInfo ? ( <span className="text-white">{userInfo.username}</span> ) : ( 
                <></> 
                )}

                {userInfo && (
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ml-1 cursor-pointer ${
                        dropdownOpen ? "transform rotate-180" : ""
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                        />
                    </svg>
                )}

            </button>

            {dropdownOpen && userInfo && (
                <ul className={`absolute right-0 mt-2 mr-0 space-y-2 
                bg-gray-800 text-white-600 ${
                    !userInfo.isAdmin ? '-top-25' : '-top-85 '
                    }`}
                >
                {userInfo.isAdmin && (
                    <>
                        <li>
                            <Link to='/admin/dashboard' 
                            className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/productlist' 
                            className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/categorylist' 
                            className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Category
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/orderlist' 
                            className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/userlist' 
                            className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Users
                            </Link>
                        </li>
                    </>
                    )}

                    <li>
                        <Link to='/profile' 
                        className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to='/logout'
                         onClick={logoutHandler}
                        className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </li>
                    
                </ul>

            )}
        

            {!userInfo && (
            <ul>
                <li>
                    <Link to='/login' 
                    className="flex items-center transition-transform transform hover:translate-x-3" >

                    <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Login</span>{""}
                    </Link>
                </li>
                <li>
                    <Link to='/register' className="flex items-center transition-transform transform hover:translate-x-3" >

                    <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Sign Up</span>{""}
                    </Link>
                </li>
            </ul>

            )}
            
        </div>
    </div>
    )
}

export default Navigation