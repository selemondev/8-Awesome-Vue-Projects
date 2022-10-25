const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
});