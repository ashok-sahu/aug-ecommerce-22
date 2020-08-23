const mongoose = require('mongoose')
const Category = require('../models/Catagory/CatagoryModel')

module.exports = async function(req,res,next){
    const {categoryId} = req.params
    if(!mongoose.Types.ObjectId.isValid(categoryId)){
        return res.status(403).json({
            status:'failed',
            error:'category not in database'
        })
    }

    try{
        let category = await Category.findById(categoryId)
        if(!category){
            return res.status(403).json({
                status:'failed',
                error:'category not found!'
            })
        }
        req.category = category
        next()
    }catch(error){
        console.error(error)
        res.status(400).json({
            status:'failed',
            error:error
        })
    }
}