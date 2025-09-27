import mongoose from 'mongoose';

const DB = process.env.MONGODB_URI;

if (!DB) {
    console.log("Please add your Mongo URI to .env.local");
}

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(DB);
        isConnected = true;
        console.log('✅ Mongo DB is Connected!');
    } catch (err) {
        console.log('❌ Mongo DB is not Connected!', err.message);
        throw err;
    }
};