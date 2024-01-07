import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectMongoDatabase } from './config/db.js';
import ProductRoutes from './routes/ProductRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import { NotFound, ErrorHandler } from './middleware/ErrorMiddleware.js';
const port = process.env.PORT || 3001;

connectMongoDatabase(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);
app.use(NotFound);
app.use(ErrorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));