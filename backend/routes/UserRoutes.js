import express from "express";
import { LoginUser, RegisterUser, LogoutUser, GetUserProfile, UpdateUserProfile, GetUsers, DeleteUser, GetUserById, UpdateUserByID} from '../controllers/UserController.js';
const Router = express.Router();
import { protect, AdminMiddleware } from "../middleware/authenticationMiddleware.js";

Router.route('/').post(RegisterUser);
Router.route('/').get(protect, AdminMiddleware, GetUsers);
Router.route('/login').post(LoginUser)
Router.route('/logout').post(LogoutUser);
Router.route('/profile').put(protect, UpdateUserProfile);
Router.route('/profile').get(protect, GetUserProfile);
Router.route('/:id').get(protect, AdminMiddleware, GetUserById);
Router.route('/:id').put(protect, AdminMiddleware, UpdateUserByID);
Router.route('/:id').delete(protect, AdminMiddleware, DeleteUser);

export default Router;