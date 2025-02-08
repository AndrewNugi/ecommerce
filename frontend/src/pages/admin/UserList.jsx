import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { 
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation, 
} from "../../redux/api/usersApiSlice" 
import Message from "../../components/Message"
import './UserList.css'

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')
    
    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id)
                toast.success('User deleted successfully')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail
            })
            setEditableUserId(null)
            refetch()
            toast.success('User updated successfully')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const cancelEdit = () => {
        setEditableUserId(null)
        setEditableUserName('')
        setEditableUserEmail('')
    }

    return (
        <div className="h1-div">
            <h1 className="h1-style">Users</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <div className="table">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th className="thead-cell">ID</th>
                                <th className="thead-cell">Name</th>
                                <th className="thead-cell">Email</th>
                                <th className="thead-cell">Admin</th>
                                <th className="thead-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user._id}>
                                    <td className="table-cell">{user._id}</td>
                                    <td className="table-cell">
                                        {editableUserId === user._id ? (
                                            <div className="edit-cell">
                                                <input
                                                    type="text"
                                                    value={editableUserName}
                                                    onChange={(e) => setEditableUserName(e.target.value)}
                                                    className="edit-input"
                                                />
                                            </div>
                                        ) : (
                                            <div className="edit-cell">
                                                <span>{user.username}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="table-cell">
                                        {editableUserId === user._id ? (
                                            <div className="edit-cell">
                                                <input
                                                    type="email"
                                                    value={editableUserEmail}
                                                    onChange={(e) => setEditableUserEmail(e.target.value)}
                                                    className="edit-input"
                                                />
                                            </div>
                                        ) : (
                                            <div className="edit-cell">
                                                <span>{user.email}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="table-cell">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>
                                    <td className="table-cell">
                                        <div className="flex">
                                            {editableUserId === user._id ? (
                                                <>
                                                    <button
                                                        onClick={() => updateHandler(user._id)}
                                                        className="confirm-update-btn"
                                                        title="Confirm"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="delete-btn"
                                                        title="Cancel"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => toggleEdit(user._id, user.username, user.email)}
                                                        className="update-btn"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    {!user.isAdmin && (
                                                        <button
                                                            onClick={() => deleteHandler(user._id)}
                                                            className="delete-btn"
                                                            title="Delete"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default UserList