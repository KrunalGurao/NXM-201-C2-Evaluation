const mongoose= require("mongoose")
const blacklistSchema= mongoose.Schema({
    accesstok: String,
    refreshtok:String
},{versionKey:false})


const blacklistModel=mongoose.model("black",blacklistSchema)
module.exports={blacklistModel}