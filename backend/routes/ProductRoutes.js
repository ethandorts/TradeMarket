import express from "express";
import { getProducts, getProductById, CreateProduct, UpdateProduct, DeleteProduct} from '../controllers/ProductController.js';
import { protect, AdminMiddleware } from "../middleware/authenticationMiddleware.js";
const Router = express.Router();

Router.route('/').get(getProducts);
Router.route('/:id').get(getProductById);
Router.route('/').post(protect, AdminMiddleware, CreateProduct);
Router.route('/:id').put(protect, AdminMiddleware, UpdateProduct);
Router.route('/:id').delete(protect, AdminMiddleware, DeleteProduct);

export default Router;