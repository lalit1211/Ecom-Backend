const mongoose = require("mongoose")
const { trim } = require("validator")


const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter the product name."],
		trim: true,
	},
	description: {
		type: String,
		required: [
			true,
			"Please enter the product description",
		],
	},
	price: {
		type: Number,
		required: [true, "Please enter the product price"],
		maxLength: [
			8,
			"price can not exceed more than 8 characters",
		],
	},
	image: {
		type: String,
		required: [true, "Please enter the product image"],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});


module.exports = mongoose.model("Product", productSchema);