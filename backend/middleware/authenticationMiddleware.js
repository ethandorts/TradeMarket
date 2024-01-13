import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import AsyncHandler from './AsyncHandler.js';

const protect = AsyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Cannot authorize user, token failure");
        }
    } else {
        res.status(401);
        throw new Error("Cannot authorize user, no token present");
    }
});


const AdminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as Admin');
    }
};

export { protect, AdminMiddleware };


