const express=require("express")
const userRouter=express.Router()
const {userModel}=require("../module/usermodle")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {blacklist}=require("../blacklist")
const{auth}=require("../middleware/auth")
const {blacklistModel}=require("../module/blacklist")
const app= express()




//************************************************************************** */

userRouter.post("/register", async(req, res)=>{
    const {email, pass, role}=req.body
    try {
        const check = await userModel.findOne({email})
        if(check)
        {
            return res.status(400).send({"msg":"User already exist"})
        }
        bcrypt.hash(pass, 5, async(req, hash)=>{
            const user= new userModel({email, pass: hash,role})
            await user.save()
            res.status(200).send({"msg":"Registration successful"})
        })
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})


//*************************************************************************************** */


userRouter.post("/login", async(req,res)=>{

    try {
        const {email, pass}=req.body
        const user= await userModel.findOne({email})
        if(!user)
        {
            return res.status(400).send({"msg":"Invalid Credential"})
        }
        const password= await bcrypt.compare(pass, user.pass)
        if(!password)
        {
            return res.status(400).send({"msg":"Invalid Credential"}) 
        }
        const token= jwt.sign({userID: user._id},"masai",{
            expiresIn:'1m'
        })
        const refreshtoken=jwt.sign({userID: user._id},"masai",{
            expiresIn:'3m'
        })
        res.status(200).send({"msg":"Login successful"})
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})


//************************************************************************************ */


userRouter.get("/logout", auth, async(req, res)=>{
    const token = req.headers.authorization
    const blacklisttok= new blacklistModel({token})
    // blacklist.push(token)
    await blacklisttok.save()
    res.status(200).send({"msg":"Logout successful"})
})


//***************************************************************************************** */


userRouter.get("/getnewtoken", (req,res)=>{
    const refreshtoken= req.headers.authorization
    const decoded= jwt.verify(refreshtoken, "krunal")
    if(decoded)
    {
        const token= jwt.sign({userID: decoded.userID},"masai",{
            expiresIn:'3m'
        })
    }
    else{
        res.status(200).send({"msg":"Please login again"})
    }
})


module.exports={userRouter}