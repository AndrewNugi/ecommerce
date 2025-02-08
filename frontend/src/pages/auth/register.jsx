import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import logo from "../../images/logo.jpeg"
import './register.css'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const result = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...result }))
                navigate(redirect)
                toast.success('You have been successfully registered!')
            } catch (error) {
                console.log(error)
                toast.error(error.data.message || error.message || "An error occurred")
            }
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
                        <h1 className="text-2xl font-semibold mb-4 text-gray">Register</h1>

                        <form onSubmit={submitHandler} className="form-container">
                            <div className="input-group">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your names please"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>

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

                            <div className="input-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="submit-button"
                            >
                                {isLoading ? "Registering your account..." : "Register"}
                            </button>

                            {isLoading && <Loader />}
                        </form>

                        <div className="login-text">
                            <p>
                                Have an account?{" "}
                                <Link
                                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                                    className="login-link"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Register