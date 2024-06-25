const jwt=require("jsonwebtoken")
const userDb=require("./model/user.mode")
const keysecret="helloworldsecrethelloworldsecrethelloworld";
const authenticate=async(req,res,next) => {
    try {
        const authHeader=req.headers.authorization;
        console.log(authHeader,"authenticated token")
        const token = authHeader.split(' ')[1]; 
        const verifyToken=jwt.verify(token,keysecret)
        console.log(verifyToken,"key secret");
        const rootuser=await userDb.findOne({_id:verifyToken._id,"tokens.token": token })
        console.log(rootuser,"root user");
        if(!rootuser){throw new Error("user not found")}
        req.token=token;
        req.rootuser=rootuser;
        req.userId=rootuser._id;
        next();
    } catch (error) {
        res.status(401).json({status:401,message: "unauthorized token error"});
    }
}

module.exports=authenticate;
