const mongoose=require("mongoose")

const userSchema= mongoose.Schema({

    email:{
        type:String,
        required: true,
        unique: true
    },
    pass:{
        type:String,
        required: true,
        unique: true
    },
    role:{
        type:String,
        required: true,
        default:"User",
        enum: ["Moderator"]
    }
},{versionKey:false})


const userModel= mongoose.model("user",userSchema)
 
module.exports={userModel}