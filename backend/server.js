import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectMongoDatabase } from './config/db.js';
import ProductRoutes from './routes/ProductRoutes.js';
import { NotFound, ErrorHandler } from './middleware/ErrorMiddleware.js';
const port = process.env.PORT || 3001;

connectMongoDatabase(); // Allows MongoDB connection

const app = express();

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.use('/api/products', ProductRoutes);
app.use(NotFound);
app.use(ErrorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));