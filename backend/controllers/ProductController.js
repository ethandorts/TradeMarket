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

//@desc Creates all availale products 
//@route POST /api/products
//@access Admin
const CreateProduct = AsyncHandler (async (req, res) => {
    const product = new Product({
        name: 'New Product',
        price: 0, 
        user: req.user.id,
        image: '/images/sample.jpg',
        brand: 'Product Brand',
        category: 'Product Category',
        countInStock: 0,
        numReviews: 0, 
        description: 'Product Description',
    })
    const ProductCreated = await product.save();
    res.status(201).json(ProductCreated);
});

//@desc Update a Product
//@route PUT /api/products/:id
//@access Admin
const UpdateProduct = AsyncHandler (async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const UpdatedProduct = await product.save();
        res.json(UpdatedProduct);
    } else {
        res.status(404);
        throw new Error('Not found');
    }
});

//@desc Delete a Product 
//@route DELETE /api/products/:id
//@access Admin
const DeleteProduct = AsyncHandler (async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if(product) {
        await Product.deleteOne({_id:product._id});
        res.status(200).json({message: 'Deleted the product'})
    } else {
        res.status(404);
        throw new Error('Not found');
    }
});



export { getProducts, getProductById, CreateProduct, UpdateProduct, DeleteProduct };