const express = require("express");
const mongoose = require("mongoose");
const server = express();
server.use(express.json());
const PORT = 3004;


mongoose.connect("mongodb://127.0.0.1:27017/ggggg")

const Userschema = mongoose.Schema({
    name: { type: String, unique: true },
    age: { type: Number, required: true },
    city: { type: String, enum: ["pune", "bangalore"] }
})

const Productschema = mongoose.Schema({
    name: { type: String },
    size: { type: String }
})

const Usermodel = mongoose.model("user", Userschema);
const Productmodel = mongoose.model("product", Productschema);

server.post("/adduser", async (req, res) => {
    try {
        await Usermodel.create(req.body);
        res.status(200).send("user added");
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
})

server.get("/getproduct", async (req, res) => {
    try {
     let data= await Productmodel.find();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
})

server.post("/addproduct", async (req, res) => {
    try {
        await Productmodel.create(req.body);
        res.status(200).send("Product added");
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
})

server.put("/updatepro/:_id", async (req, res) => {
    try {
        await Productmodel.updateOne(req.params,{$set:req.body});
        res.status(200).send("Product updated");
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
})


server.delete("/deletepro/:_id", async (req, res) => {
    try {
        await Productmodel.deleteOne(req.params);
        res.status(200).send("Product deleted");
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
})


server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})