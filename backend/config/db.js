import mongoose from "mongoose";

 export const connectMongoDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(`Unable to connect to database: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongoDatabase;