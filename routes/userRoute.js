const express = require("express")
const {
    registerUser,
    loginUser,
    logOut
} = require("../controllers/userController")




const routes = express.Router()
routes.route("/register").post(registerUser)
routes.route("/login").post(loginUser)
routes.route("/logout").post(logOut)



module.exports = routes