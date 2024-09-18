import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductForDetail, getSingleProductBYId, updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateSeller from '../middlewares/sellerMiddleware.js';
import authenticateAdmin from '../middlewares/adminMiddleware.js';

const productRoute = express.Router();







productRoute.post('/addproduct', authenticateSeller, upload.single('image'), addProduct);
productRoute.get('/getproducts', getAllProducts);
productRoute.get('/getsingleproduct', authenticateSeller, getSingleProductBYId);
productRoute.put('/update/:sellerId/product/:id', authenticateSeller, upload.single('image'), updateProduct);
productRoute.delete('/deleteproduct/:sellerId/product/:id', authenticateSeller, deleteProduct);
productRoute.get("/products/:id", getProductForDetail);



export default productRoute;