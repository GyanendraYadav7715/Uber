require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Middleware to log request data
app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`);
    console.log("Request Body:", req.body);
    console.log("Query Params:", req.query);
    console.log("Headers:", req.headers);
    next();
});


app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ BFF Server running on port ${PORT}`);
});
