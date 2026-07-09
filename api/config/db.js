import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube-tools', {
      // Mongoose 6+ does not need useNewUrlParser, useUnifiedTopology, etc.
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // We don't exit process in this context, just log it, so server can still serve mock data
  }
};

export default connectDB;
