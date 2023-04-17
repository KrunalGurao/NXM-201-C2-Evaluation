function blogauth (permission){
    return (req, res, next)=>{
        if(permission.includes(req.role))
        {
            next()
        }
        else{
            return res.status(400).send("Access denied!!")
        }
    }
  
}


module.exports= {blogauth}