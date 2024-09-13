const express = require("express")
const {
	isAuthenticateUser,
} = require("../middlewares/auth");
const { addToCart, getCartData, deleteFromCart } = require("../controllers/cartController")


const routes = express.Router()
// ADDING PRODUCT TO CART
routes.route("/cart").post(addToCart)
// GET CART PRODUCTS
routes.route("/cart").get(isAuthenticateUser, getCartData)
routes.route("/cart/:id").delete(deleteFromCart)



module.exports = routes