const Category = require('../models/Catagory/CatagoryModel')

exports.addCategory = async(req,res)=>{
    const {name} = req.body
    try{
        let category = await Category.findOne({name})
        if(category){
            res.status(403).json({
                error:"Category is already exists"
            })
        }
        const newCategory = new Category({
            name
        })
        category = await newCategory.save()
        res.json(category)
    }catch(error){
        console.log(error)
        res.status(400).json({
            message:'error while create category'
        })
    }
}

exports.getAllCategory = async(req,res)=>{
    try{
        let allCategory = await Category.find({})
        res.status(200).json({
            status:'success',
            length:allCategory.length,
            data:allCategory
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            status:'failed',
            data:error
        })
    }
}

exports.getCategory = async (req,res,next) =>{
    if(req.category){
        return res.status(200).json({
            status:'success',
            data:req.category
        })
    } 
}

exports.updateCategory = async (req,res,next)=>{
    let category = req.category
    const {name} = req.body
    if(name) category.name = name.trim()

    try{
        category = await category.save()
        res.status(200).json({
            status:'success',
            message:'data updated successful',
            data:category
        })
    }catch(error){
        console.error(error)
        res.status(400).json({
            status:'failed',
            message:'error while update',
            error:error
        })
    }
}

exports.deleteCategory = async (req,res,next)=>{
    let category = req.category
    try{
        let deletedCategory = await category.remove()
        res.status(200).json({
            status:'success',
            message:`${deletedCategory.name} deleted successfully`
        })
    }catch(error){
        console.error(error)
        res.status(400).json({
            status:'failed',
            message:'category not in the database',
            error:error
        })
    }   
}