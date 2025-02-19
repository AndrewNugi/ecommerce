import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import './AdminMenu.css'

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  
    return (
    <>
        <button 
            className={`menu-toggle ${isMenuOpen ? 'menu-toggle-open' : 'menu-toggle-closed'}`} 
            onClick={toggleMenu}
        >
            {isMenuOpen ? (
                <FaTimes color='black' />
            ) : (
                <>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </>
            )}
        </button>

        {isMenuOpen && (
            <section className="menu-section">
                <ul className="menu-list">
                    <li>
                        <NavLink 
                            className="menu-link"
                            to='/admin/dashboard' 
                            style={({isActive}) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="menu-link"
                            to='/admin/categorylist' 
                            style={({isActive}) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Create Category
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="menu-link"
                            to='/admin/productlist' 
                            style={({isActive}) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Create Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="menu-link"
                            to='/admin/allproductslist' 
                            style={({isActive}) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Product List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="menu-link"
                            to='/admin/userlist' 
                            style={({isActive}) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="menu-link"
                            to='/admin/orderlist' 
                            style={({isActive}) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Manage orders
                        </NavLink>
                    </li>
                </ul>
            </section>
        )}
    </>
    )
}

export default AdminMenu