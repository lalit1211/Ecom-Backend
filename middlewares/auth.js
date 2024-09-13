const jwt = require("jsonwebtoken")
const catchAsync = require("./catchAsync")
const _Error = require("../utils/_Error")
const User = require("../models/userModel")

exports.isAuthenticateUser = catchAsync(async (req, res, next)=>{
    const {token} = req.headers
    
    if(!token){
        return next(new _Error("Please login to access the resources", 401))
    }
    const decoded = jwt.verify(
		token,
		process.env.JWT_SECRET_KEY,
	);
    ;
    
    if(!decoded){
        return next(new _Error("You are logged out", 401))
    }

    req.user = await User.findById(decoded.id);
    // console.log("=======>", req.user);
    

    next()
})