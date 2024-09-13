const User = require("../models/userModel")
const catchAsync = require("../middlewares/catchAsync")
const sendToken = require("../utils/jwtTokens")
const _Error = require("../utils/_Error")


// REGISTER USER
exports.registerUser = catchAsync(async(req, res, next)=>{

    const { name, email, password, role } = req.body;
    const user = await User.create({
		name,
		email,
		password,
		role,
	});

    sendToken(user, 201, res)

})


// LOGIN USER
exports.loginUser = catchAsync(async(req, res, next)=>{
    const {email, password} = req.body

    if(!email || !password){
        return next(
			new _Error(
				"Please enter the email & password",
				400,
			),
		);
    }

    const user = await User.findOne({ email }).select(
		"+password",
	);

    if (!user) {
        return next(new _Error("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(
		password
	);

    if (!isPasswordMatched) {
        return next(new _Error("Invalid email or password", 401))
    }


    sendToken(user, 200, res)
})



// LOGOUT USER
exports.logOut = catchAsync(async(req, res, next)=>{
    res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

    res.status(200).json({
		success: true,
		message: "Logout Success",
	});
})