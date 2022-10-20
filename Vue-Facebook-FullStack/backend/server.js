const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
});