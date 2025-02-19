import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { 
    useUpdateProductMutation, 
    useDeleteProductMutation, 
    useGetProductByIdQuery, 
    useUploadProductImageMutation 
} from "../../redux/api/productApiSlice"
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"
import './ProductUpdate.css'

const ProductUpdate = () => {

    const params = useParams()

    const { data: productData } = useGetProductByIdQuery(params._id)
    const [ image, setImage ] = useState(productData?.image || "")
    const [ name, setName ] = useState(productData?.name || "")
    const [ description, setDescription ] = useState(productData?.description || "")
    const [ price, setPrice ] = useState(productData?.price || "")
    const [ category, setCategory ] = useState(productData?.category || "")
    const [ brand, setBrand ] = useState(productData?.brand || "")
    const [ quantity, setQuantity ] = useState(productData?.quantity || "")
    const [ stock, setStock ] = useState(productData?.countInStock)

    const navigate = useNavigate()
    
    const { data: categories = [] } = useGetAllCategoriesQuery()
    const [updateProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category._id)
            setQuantity(productData.setQuantity)
            setBrand(productData.brand)
            setImage(productData.image)

        }
    }, [productData]) 

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image',e.target.files[0])

        try {
            const res = await updateProductImage(formData).unwrap()
            toast.success("Image added succefully")
            setImage(res.image)

        } catch (error) {
            toast.error("Image not added.")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        
        if (!name || !description || !price || !category || !brand || !stock) {
            toast.error('Please fill all fields')
            return
        }

        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('brand', brand)
            formData.append('countInStock', stock)

            const result = await updateProduct({productId: params._id, formData})
            
            if (result.error) {
                toast.error('Error updating product')
            } else {
                toast.success(`${result.name} is updated`)
                navigate('/admin/allproductslist')
            }

        } catch (error) {
            console.error('Product creation error:', error)
            toast.error(error?.data?.message || "Product creation failed. Try again")
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault() 
        
        try {

            let answer = window.confirm('Are you sure you want to delete this product?')

            if(!answer) return;

            const result  = await deleteProduct(params._id)
            toast.success(`${result.name} is deleted`)
            navigate('/admin/allproductslist')
            
        } catch (error) {
            console.log(error)
            toast.error("Product didn't delete. Try again")
        }
    }

    return (
        <div className="product-container">
            <div className="product-layout">
                <AdminMenu />
                <div className="product-form-container">
                    <div className="create-product-header">Create Product</div>

                    {image && (
                        <div className="image-preview">
                            <img 
                                src={image} 
                                alt="product" 
                                className="preview-image"
                            />
                        </div>
                    )}

                    <div className="image-upload">
                        <label htmlFor="image-input" className="upload-label">
                            {image ? "Change Image" : "Upload Image"}
                            <input 
                                id="image-input"
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={uploadFileHandler} 
                                className="hidden-input"
                            />
                        </label>
                    </div>

                    <form className="update-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name-input">Name</label>
                                <input 
                                    id="name-input"
                                    type="text" 
                                    className="form-input" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price-input">Price</label>
                                <input 
                                    id="price-input"
                                    type="number" 
                                    className="form-input" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="quantity-input">Quantity</label>
                                <input 
                                    id="quantity-input"
                                    type="number" 
                                    className="form-input" 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brand-input">Brand</label>
                                <input 
                                    id="brand-input"
                                    type="text" 
                                    className="form-input" 
                                    value={brand} 
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category-select">Category</label>
                                <select 
                                    id="category-select"
                                    className="form-input"
                                    onChange={e => setCategory(e.target.value)}
                                    value={category}
                                >
                                    <option value="">Select a category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock-input">Count In Stock</label>
                                <input 
                                    id="stock-input"
                                    type="number" 
                                    className="form-input" 
                                    value={stock} 
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description-input">Description</label>
                            <textarea 
                                id="description-input"
                                className="form-textarea" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="button-group">
                            <button 
                                type="submit"
                                onClick={handleUpdate}
                                className="update-button"
                            >
                                Update
                            </button>
                            <button 
                                type="submit"
                                onClick={handleDelete}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate