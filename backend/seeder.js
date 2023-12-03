import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import User from './models/UserModel.js';
import products from './data/products.js';
import Product from './models/ProductModel.js';
import Order from './models/OrderModel.js';
import connectMongoDatabase from './config/db.js';

dotenv.config();
connectMongoDatabase();

const ImportDataIntoDatabase = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const UsersCreated = await User.insertMany(users);
        const Admin = UsersCreated[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user: Admin};
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported Into Database'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const DestroyDataInDatabase = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log(`Data Destroyed In Database`.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    DestroyDataInDatabase();
} else {
    ImportDataIntoDatabase();
}
