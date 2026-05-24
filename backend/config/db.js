const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // We use the URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Exit process with failure code if the database fails to connect
        process.exit(1);
    }
};

module.exports = connectDB;