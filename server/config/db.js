import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Fix Node.js 17+ DNS resolution issues on Windows for MongoDB Atlas SRV records
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

// Force standard Google DNS servers to resolve Atlas hostnames, bypassing ISP-level blocking
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

export default connectDB;