const mongoose = require("mongoose");
const url=process.env.DB_URL;
module.exports.connect = async ()=>{
    try{
        await mongoose.connect(url)
        console.log("MongoDB Connected!");
    }
    catch(err){
        console.log("MongoDB not connected"+err);
    }
}
//connect db
