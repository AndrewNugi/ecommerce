import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import logo from "../../images/logo.jpeg"

const register = () => {

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ register, { isLoading } ] = useRegisterMutation()
    const  { userInfo }  = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [ navigate, userInfo, redirect ])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const result = await register({username, email, password}).unwrap()
                dispatch(setCredentials({...result}))
                navigate(redirect)
                toast.success('You have been succesfully registered!')
            } catch (error) {
                console.log(error)
                toast.error(error.data.message || error.message || "An error occurred")
            }
        }
    }


  return (
    <div>
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4 text-gray">Register</h1>

                <form  onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="name" className="block text-sm font-medium text-black">
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
                            className="mt-1 p-2 border rounded w-full">
                        </input>
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium text-black">
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
                            className="mt-1 p-2 border rounded w-full">

                        </input>
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium text-black">
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
                            className="mt-1 p-2 border rounded w-full">

                        </input>
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
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
                            className="mt-1 p-2 border rounded w-full">
                        </input>
                    </div>

                    <button disabled={isLoading} type="submit" 
                        className="bg-pink-500 text-white px-4 py-2 
                        rounded cursor-pointer my-[1rem]">{isLoading ? "Registering your account..." : "Register"}
                    </button>
                    
                    {isLoading && <Loader />}

                </form>

                <div className="mt-4">
                    <p className="text-black">Have an account? {""}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        className="text-pink-500 hover:underline"> Log in </Link>
                    </p>
                </div>
            </div>

            <img src={logo} alt=""
                className="h-[35rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg" 
            />

      </section>
    </div>
  )
}

export default register
