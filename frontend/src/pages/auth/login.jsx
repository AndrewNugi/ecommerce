import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const result = await login({email, password}).unwrap()
            dispatch(setCredentials(result))
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.message || "An error occurred")
        }
    }

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem">
            <h1 className="text-2xl font-semibold mb-4 text-gray">Login</h1>

            <form onSubmit={submitHandler} className="container w-[40rem]">
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 border rounded w-full">

                    </input>
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 border rounded w-full">

                    </input>
                </div>

                <button disabled={isLoading} type="submit" 
                className="bg-pink-500 text-white px-4 py-2 
                rounded cursor-pointer my-[1rem]">{isLoading ? "Logging In..." : "Login"}
                </button>

                {isLoading && <Loader />}
            </form>

            <div className="mt-4">
                <p className="text-black">Don't have an account? 
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
                     className="text-pink-500 hover:underline"> Register </Link>

                </p>

            </div>
        </div>

      </section>
    </div>
  )
}

export default login
