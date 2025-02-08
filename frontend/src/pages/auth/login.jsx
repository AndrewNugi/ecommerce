import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import logo from "../../images/logo.jpeg"
import './login.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const result = await login({ email, password }).unwrap()
            dispatch(setCredentials(result))
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.message || "An error occurred")
        }
    }

    return (
        <div className="page-container">
            <div className="content-container">
                <div className="logo-container">
                    <img src={logo} alt="Kickverse logo" className="logo" />
                </div>

                <section className="form-section">
                    <div>
                        <h1 className="text-2xl font-semibold mb-4 text-gray">Login</h1>

                        <form onSubmit={submitHandler} className="form-container">
                            <div className="input-group">
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="submit-button"
                            >
                                {isLoading ? "Logging In..." : "Login"}
                            </button>

                            {isLoading && <Loader />}
                        </form>

                        <div className="register-text">
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                    className="register-link"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Login