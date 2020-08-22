const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.header('x-auth-token')

    //check if no token
    if(!token){
        return res.status(401).json({
            status:'failed',
            msg:'No token, auth denied'
        })
    }

    //verify token
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode.user
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({
            status:'failed',
            msg:'Token is not valid'
        })
    }
}