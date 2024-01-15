import express from 'express';
const Router = express.Router();
import {
    CreateOrder,
    GetMyOrders,
    GetOrderById,
    UpdateOrderToBePaid,
    UpdateOrderToBeDelivered,
    GetAllOrders,
} from "../controllers/OrdersController.js"
import { protect, AdminMiddleware } from '../middleware/authenticationMiddleware.js';

Router.route('/').post(protect, CreateOrder);
Router.route('/myorders').get(protect, GetMyOrders);
Router.route('/:id').get(protect, AdminMiddleware, GetOrderById);
Router.route('/:id/pay').put(protect, UpdateOrderToBePaid);
Router.route('/:id/deliver').put(protect, AdminMiddleware, UpdateOrderToBeDelivered);
Router.route('/').get(protect, AdminMiddleware, GetAllOrders);

export default Router;
