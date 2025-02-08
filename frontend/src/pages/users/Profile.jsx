import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersApiSlice"
import "./Profile.css"

const Profile = () => {

    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const { userInfo } = useSelector(state => state.auth)

    const [ updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    useEffect (() => {
        setUsername(userInfo.username)
        setUsername(userInfo.username)

    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')

        }else {
            try {
                const result = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
                dispatch(setCredentials({...result}))
                toast.success("Profile updated successfully") 
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }
  return (
  <div className="container">
    <div className="form-style">
        <div className="form-style-2">
            <h1 className="h1-text">Update Profile</h1>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="" className="label">Name</label>
                    <input 
                    type="text"
                    placeholder="Enter name"
                    className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="label">Email</label>
                    <input 
                    type="email"
                    placeholder="Enter email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="label">Password</label>
                    <input 
                    type="password"
                    placeholder="Enter password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="label">Confirm Password</label>
                    <input 
                    type="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)} 
                    />
                </div>

                <div className="button-spacing">
                    <button type="submit" className="button-style">
                        Update
                    </button>
                    <Link to='/user-orders' className="button-style">
                    My Orders
                    </Link>
                </div>
            </form>
        </div>
        {loadingUpdateProfile && <Loader/>}
    </div>
  </div>
  )
}

export default Profile
