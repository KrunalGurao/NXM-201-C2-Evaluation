const express=require("express")
const blogRouter=express.Router()
const {blogModel}=require("../module/blogmodle")
const {blogauth}=require("../middleware/blogauth")

//Moderator should be able to delete any blog (you can have a separate endpoint for this)

blogRouter.get("/", blogauth(["User","Moderator"]),async(req,res)=>{
    const token =req.headers.authorization
    const decoded= await verify(token, "masai")
    try {
        if(decoded)
        {
            const data = await blogModel.find({"userID":decoded.userID})
            res.status(200).send(data)
        }
       
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})


//****************************************************************************************** */


blogRouter.post("/add", blogauth(["User","Moderator"]), async(req, res)=>{
    try {
        const data = new blogModel(req.body)
        await data.save()
        res.status(200).send({"msg":"A new blog has been added"})
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})


//************************************************************************************************ */

blogRouter.delete("/delete/:id", blogauth(["Moderator"]), async(req,res)=>{
    const id = req.params.id
    try {
        await blogModel. findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"A blog has been deleted"})
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})


//******************************************************************************************************* */



blogRouter.patch("/update/:id", blogauth(["User","Moderator"]), async(req,res)=>{
    const {id}= req.params
    const payload= req.body
    try {
        await blogModel. findByIdAndUpdate({_id:id}, payload)
        res.status(200).send({"msg":"A blog has been updated"})
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})




module.exports={blogRouter}