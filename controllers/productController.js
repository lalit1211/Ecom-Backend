const Product = require("../models/productModel")
const catchAsync = require("../middlewares/catchAsync")
const _Error = require("../utils/_Error")
const User = require("../models/userModel")


// CREATE PRODUCT -- ADMIN
exports.createProduct = catchAsync(async(req, res, next)=>{
    
    if(req.user.role !== "admin"){
        return next(new _Error("You are not authorized", 401))
    }
    const {
        name,
        image,
        price,
        description,
        
    } = req.body
    req.body.user = req.user._id

    const newProduct = await Product.create({
        name,
        image,
        price,
        description,
        user : req.user._id
    })

    res.status(201).json({
        status : "success",
        message : `${name} product created successfully`,
        product : newProduct
    })
    
})

// UPDATE PRODUCT --ADMIN
exports.updateProduct = catchAsync(async(req, res, next)=>{
    if(req.user.role !== "admin"){
        return next(new _Error("You are not authorized", 401))
    }

    const {id} = req.params
    if(!id){
        return next(new _Error("Please provide Product id", 400))
    }
    let product = await Product.findById(id)

    if(!product){
        return next(new _Error("Product does not exists with this id", 401))
    }

    product = await Product.findByIdAndUpdate(id, req.body, {new:true})
    
    res.status(200).json({
        message : "success",
        product
    })
})


// DELETE PRODUCT  --ADMIN
exports.deleteProduct = catchAsync(async(req, res, next)=>{
    if (req.user.role !== "admin") {
		return next(
			new _Error("You are not authorized", 401),
		);
	}
    
    const{id} = req.params
    if(!id){
        return next(new _Error("Please provide id", 400))
    }
    // const isExists = await Product.findById(id)
    // if(!isExists){

    // }
    const product = await Product.findByIdAndDelete(id)
    if(!product){
        return next(new _Error("Product does not find by given id", 400))
    }

    res.status(200).json({
        status : "success",
        message : "product deleted successfully"
    })
})


// GET ALL PRODUCT
exports.getAllProducts = catchAsync(async (req, res, next)=>{
    const allProducts = await Product.find();

    res.status(200).json({
        status: "success",
        allProducts
    })
    
})

// GET SINGLE PRODUCT
exports.getSingleProduct = catchAsync(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new _Error("Product is not found with this id", 404))
    }
    res.status(200).json({
        message: "success",
        product
    })
})