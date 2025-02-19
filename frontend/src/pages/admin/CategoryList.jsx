import { useState } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery } from '../../redux/api/categoryApiSlice'
import CategoryForm from "../../components/CategoryForm"
import Modal from '../../components/Modal'
import './CategoryList.css'
import AdminMenu from "./AdminMenu"

const CategoryList = () => {
    const {data: categories } = useGetAllCategoriesQuery()
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [modalVisible, setModalVisible] = useState(null)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async (e) => {
        e.preventDefault()

        if(!name) {
            toast.error('Category name is required')
            return
        }
        try {
            const result = await createCategory({name}).unwrap()
            if(result.error) {
                toast.error(result.error)
            } else {
                setName('')
                toast.success(`${result.name} is created.`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Creating category failed. Try again')
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()

        if(!updateName) {
            toast.error('Category name is required')
            return
        }
        try {
            const result = await updateCategory({categoryId: selectedCategory._id, updateCategory: {name: updateName}}).unwrap()

            if(result.error) {
                toast.error(result.error)
            } else {
                toast.success(`${result.name} is updated`)
                setSelectedCategory(null)
                setUpdateName('')
                setModalVisible(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteCategory = async (e) => {
        e.preventDefault()
        
        if(!selectedCategory?._id) {
            toast.error('Category name is required')
            return
        }
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(`${result.name} is deleted.`)
                setSelectedCategory(null)
                setModalVisible(false)
            }

        } catch (error) {
            toast.error('Deleting category failed. Try again')
        }
    }


  return (
    <div className="main-container">
        <AdminMenu />
        <div className="h1-style">Manage Categories</div>
        <div className="form-container">
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
            <br />
            <div className="categories">
                {categories?.map((category) => (
                    <div key={category._id}>
                        <button className="category-button" onClick={() => {{
                            setModalVisible(true)
                            setSelectedCategory(category)
                            setUpdateName(category.name)
                        }}}>
                            {category.name}
                        </button>
                    </div>
                ))}
            </div>

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <CategoryForm 
                value={updateName} 
                setValue={(value) => setUpdateName(value)}
                handleSubmit={handleUpdateCategory}
                buttonText="Update"
                handleDelete={handleDeleteCategory}
                 />
            </Modal>
        </div>
    </div>
  )
}

export default CategoryList
