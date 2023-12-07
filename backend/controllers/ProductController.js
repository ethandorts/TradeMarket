import AsyncHandler from "../middleware/AsyncHandler.js";
import Product from '../models/ProductModel.js';

//@desc Gets all availale products 
//@route GET /api/products
//@access Public
const getProducts = AsyncHandler (async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//@desc Gets a specific product
//@route GET /api/products/:id
//@access Public
const getProductById = AsyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id); 

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource was not found');
    }
});

export { getProducts, getProductById };