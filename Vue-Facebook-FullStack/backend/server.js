const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const errorMiddleware = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
});