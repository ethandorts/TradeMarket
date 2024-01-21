import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import { connectMongoDatabase } from './config/db.js';
import ProductRoutes from './routes/ProductRoutes.js';
import OrdersRoutes from './routes/OrdersRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import UploadRoutes from './routes/UploadRoutes.js';
import { NotFound, ErrorHandler } from './middleware/ErrorMiddleware.js';
const port = process.env.PORT || 3001;

connectMongoDatabase(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("API is running...");
});

app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/orders', OrdersRoutes);
app.use('/api/upload', UploadRoutes);

app.get('api/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

const directory_name = path.resolve();
app.use('/uploads', express.static(path.join(directory_name, '/uploads')));

app.use(NotFound);
app.use(ErrorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));