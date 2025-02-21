import express from "express";
import formidable from 'express-formidable'
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct, updateProduct, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReviews, fetchTopProduct, fetchNewProduct } from "../controllers/productController.js";


const router = express.Router();

router.route('/')
.post(authenticate, authorizeAdmin, formidable(), addProduct)
.get(fetchProducts)

router.route('/allProducts').get(fetchAllProducts)
router.route('/:id/reviews').post(authenticate, checkId, addProductReviews)

router.get('/topProduct', fetchTopProduct)
router.get('/newProduct', fetchNewProduct)

router.route('/:id')
.get(fetchProductById)
.put(authenticate, authorizeAdmin, formidable(), updateProduct)
.delete(authenticate, authorizeAdmin, removeProduct)

export default router