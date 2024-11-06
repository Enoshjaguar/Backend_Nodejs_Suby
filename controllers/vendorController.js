const Vendor = require('../models/Vendor');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.WhatIsYourName
const vendorRegister = async(req,res)=>{
    const {username, email, password} = req.body;

    try{
        const vendorEmail = await Vendor.findOne({email})
        if (vendorEmail){
            res.status(400).json("email alredy exists")
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const newVendor = new Vendor({
            username,email,password:hashedpassword
        });
        
        await newVendor.save()
        res.status(200).json({message:"vendor registeredsuccessfully...."})
        console.log('registerd')
    }
    catch(err){
        res.status(500).json({error:"internal server error.."})
        console.error(err)
    }
}

const vendorLogin = async(req,res)=>{
    const {email,password} = req.body

    try{
        const vendor = await Vendor.findOne({email})

        if (!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error : "Invalid username or password"})
        }
        const token = jwt.sign({vendorId : vendor._id},secretKey,{expiresIn:'1h'})
        res.status(200).json({success: "Login Successfull",token})

        console.log(email," this is the token ",token)
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

const getAllVendors = async(req,res)=>{
    try{
        const vendors = await Vendor.find().populate('firm')
        res.json({vendors})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error..."})
    }
}
const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;
    try{
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({error:"Vendor not found.."})
        }
        res.status(200).json({vendor})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}
module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById}