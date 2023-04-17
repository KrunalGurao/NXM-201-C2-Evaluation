const express= require("express")
const {connection}=require("./db")
const mongoose=require("mongoose")
require("dotenv").config()
const {userRouter}=require("./routes/userouter")
const {blogRouter}=require("./routes/blogrouter")
const {auth}=require("./middleware/auth")




const app= express()
app.use(express.json())


app.use("/users", userRouter)
app.use(auth)
app.use("/blogs", blogRouter)


app.listen(process.env.port, async(req,res)=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (err) {
        console.log("**************NOT CONNECTED TO DB****************")
    }
})