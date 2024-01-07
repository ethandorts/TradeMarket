import express from "express";
import { LoginUser, RegisterUser, LogoutUser, GetUserProfile, UpdateUserProfile, GetUsers, DeleteUser, GetUserById, UpdateUserByID} from '../controllers/UserController.js';
const Router = express.Router();

Router.route('/').post(RegisterUser);
Router.route('/').get(GetUsers);
Router.route('/login').post(LoginUser)
Router.route('/logout').post(LogoutUser);
Router.route('/profile').put(UpdateUserProfile);
Router.route('/profile').get(GetUserProfile);
Router.route('/:id').get(GetUserById);
Router.route('/:id').put(UpdateUserByID);
Router.route('/:id').delete(DeleteUser);

export default Router;