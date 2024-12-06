const express = require('express');
const app = express();
const cookiesParse =require('cookie-parser')
const connectToDb = require('./db/db');
connectToDb();
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParse())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/users',userRoutes)

module.exports = app;