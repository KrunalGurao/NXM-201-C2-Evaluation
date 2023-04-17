const jwt= require("jsonwebtoken")
const {userModel}=require("../module/usermodle")
const {blacklist}=require("../blacklist")


const auth= async(req, res, next)=>{
    try {
        const token=req.headers.authorization
        if(blacklist.includes(token))
        {
return  res.status(400).send({"msg":"Unauthorized"})
        }
        const decodedToken=jwt.verify(token, "masai")
        const {userID}= decodedToken
        const user= await userModel.findOne({_id: userID})
        const role = user?.role
        next()

    } catch (err) {
        res.status(400).send({"msg":"Unauthorized"})
    }
}




module.exports={auth}