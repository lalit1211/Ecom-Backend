const Cart = require("../models/cartModel")
const catchAsync = require("../middlewares/catchAsync")
const _Error = require("../utils/_Error")


// ADD TO CART
exports.addToCart = catchAsync(async(req, res, next)=>{
    const {
        productName,
        productPrice,
        productImage,
        quantity,
        userId,
        productId,
        Stock
    } = req.body

    const cart = await Cart.create({
        productName,
        productPrice,
        productImage,
        quantity,
        productId,
        userId,
        Stock
    })

    res.status(200).json({
        status : "success",
        message : "product added to cart",
        cart
    })
})


// GET DATA FROM CART
exports.getCartData = catchAsync(async(req, res, next)=>{
    const cartData = await Cart.find({userId : req.user._id})
    
    if(!cartData){
        return next(new _Error("Your cart is empty"), 400)
    }

    res.status(200).json({
        status : "success",
        message : "here is your cart",
        cartData
    })
})

// DELETE FROM CART
exports.deleteFromCart = catchAsync(async(req, res, next)=>{
    const {id} = req.params

    const cartProduct = await Cart.findById(id)
    if(!cartProduct){
        return next(new _Error("Product not found with this Id", 404))
    }
    const isDeleted = await Cart.findByIdAndDelete(id)
    
    if(!isDeleted){
        return next(new _Error("Having problem to delete product", 400))
    }

    res.status(200).json({
        status : "success",
        message : "product deleted successfully",
        isDeleted
    })
})