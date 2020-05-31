require('colors');
const express = require('express');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const routes = require('./routes/transaction');

dotenv.config({path : './config/config.env'});
connectdb();
const app = express();
app.use(express.json());
app.use(routes);


//Port declaration
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server Running at PORT ${PORT}`.cyan.bold);
})
