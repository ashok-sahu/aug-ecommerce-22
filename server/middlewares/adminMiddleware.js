const User = require('../models/Auth/userModal')

module.exports = async (req,res,next)=>{
    try{
        const user = await User.findOne({
            _id:req.user.id
        })

        if(user.role === 0){
            return res.status(403).json({
                error:"Admin resources access denied"
            })
        }
        next()
    }catch(error){
        console.error(error)
        res.status(500).send('server error')
    }
}