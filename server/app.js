const path = require('path')
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/URl-shortener", {useNewUrlParser: true});


const urlSchema = new mongoose.Schema({
    url: {
        required: true,
        type: String
    }
      
})

urlSchema.plugin(require('mongoose-nanoid'), 7)

const URL = mongoose.model("URL", urlSchema)



app.post("/generateUrl", (req, res) => {
    const { url } = req.body;
    let newURL = new URL({ url })

    try{
        newURL.save();
    }catch{
        res.send("An error was encountered! Please try again.");
    }

    res.json({message: `http://localhost:8080/${newURL._id}`, type: "Success"})
})




app.listen(process.env.DEV_PORT || 8080, function(){
    console.log("Listening on port: " + process.env.DEV_PORT)
})
