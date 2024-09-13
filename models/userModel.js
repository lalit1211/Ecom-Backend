const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const jwt = require("jsonwebtoken");



const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
		minLength: [
			3,
			"Please enter at least 3 characters",
		],
		maxLength: [
			18,
			"Name can't bigger than 18 characters",
		],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		validate: [
			validator.isEmail,
			"please enter a valid email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minLength: [
			4,
			"Password should be greater than 4 characters",
		],
		select: false,
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "admin"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});



// HASHED PASSWORD
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
		this.password = await bcrypt.hash(this.password, 8)
    }
	next()
})

// JWT TOKEN
userSchema.methods.getJwtToken = function(){
	return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
		expiresIn : process.env.JWT_EXPIRES
	})
} 

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// GENERATING RESET PASSWORD TOKEN
userSchema.methods.getResetToken = function(){
	const resetToken = crypto
		.randomBytes(20)
		.toString("hex");

		this.resetPasswordToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
}


module.exports = mongoose.model("User", userSchema);