const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB successfully: ${conn.connection.host}`.cyan.bold)
    } catch (err) {
        console.log(`An error occurred while connecting to the Database`.red.bold)
        process.exit(1);
    }
};

module.exports = connectDB;