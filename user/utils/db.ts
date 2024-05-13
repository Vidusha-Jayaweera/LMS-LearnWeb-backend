import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl: string = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        // Set the socketTimeoutMS option to 30000 milliseconds (30 seconds)
        const options: mongoose.ConnectOptions = {
            socketTimeoutMS: 30000, // Adjust this value as needed
        };

        await mongoose.connect(dbUrl, {
            ...options,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions).then((data: any) => {
            console.log(`Database connected with ${data.connection.host}`);
        });
    } catch (error: any) {
        console.log(error.message);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
