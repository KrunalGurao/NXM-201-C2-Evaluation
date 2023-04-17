const mongoose=require("mongoose")
const blogSchema= mongoose.Schema({
    name:String,
    blog:String,
    location:String
},{versionKey:false})

const blogModel= mongoose.model("blog", blogSchema)

module.exports={
    blogModel
}
