import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import { useGetAllCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import './ProductList.css';

const ProductList = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useGetAllCategoriesQuery();

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !price || !category || !brand || !stock) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const productData = new FormData();
            productData.append('image', image);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('category', category);
            productData.append('quantity', quantity);
            productData.append('brand', brand);
            productData.append('countInStock', stock);

            const result = await createProduct(productData).unwrap();

            if (result._id) {
                toast.success(`${result.name} is created`);
                navigate('/admin/allproductslist');
            } else {
                toast.error('Error creating product');
            }
        } catch (error) {
            console.error('Product creation error:', error);
            toast.error(error?.data?.message || "Product creation failed. Try again");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Create Product</h1>
            </div>
            <AdminMenu />
            <div className="content-wrapper">
                
                <div className="main-content">
                    {imageUrl && (
                        <div className="image-preview">
                            <img
                                src={imageUrl}
                                alt="product"
                                className="preview-image"
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label
                            htmlFor="image-input"
                            className="upload-label"
                        >
                            {imageUrl ? "Change Image" : "Upload Image"}
                            <input
                                id="image-input"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className="file-input"
                            />
                        </label>
                    </div>

                    <form className="form-container">
                        <div className="flex-wrap">
                            <div className="input-group">
                                <label htmlFor="name-input">Name</label>
                                <input
                                    id="name-input"
                                    type="text"
                                    className="form-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
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

                        <div className="flex-wrap">
                            <div className="input-group">
                                <label htmlFor="quantity-input">Quantity</label>
                                <input
                                    id="quantity-input"
                                    type="number"
                                    className="form-input"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
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

                        <div className="flex-wrap">
                            <div className="input-group">
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
                            <div className="input-group">
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

                        <div className="input-group">
                            <label htmlFor="description-input">Description</label>
                            <textarea
                                id="description-input"
                                className="description-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="submit-button"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductList;