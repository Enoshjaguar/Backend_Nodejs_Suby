const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 4000

dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("connected to database successfully"))
    .catch((err)=>console.log("some error occured ",err))

app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'));
app.listen(PORT,()=>{
    console.log("server initiated at port ",PORT)
})

app.use('/',(req,res)=>{
    res.send(`<h1>Welocome to SUBY</h1> and the link is ${dblink}`)
})