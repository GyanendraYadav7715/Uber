const express = require('express');
const app = express();
const connectToDb = require('./db/db');
connectToDb();
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.user(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send('hello world')
})

app.use('/users',userRoutes)

module.exports = app;