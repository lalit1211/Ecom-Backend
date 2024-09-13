const express = require("express")
const 
	{isAuthenticateUser} = require("../middlewares/auth");
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    
} = require("../controllers/productController")



const routes = express.Router();
// CREATED PRODUCT ROUTE BY ---ADMIN
routes.route("/products").post(isAuthenticateUser, createProduct);
// UPDATE PRODUCT ROUTE BY  --ADMIN
routes.route("/products/:id").put(isAuthenticateUser, updateProduct)
// DELETE PRODUCT ROUTE BY  --ADMIN
routes.route("/products/:id").delete(isAuthenticateUser, deleteProduct)



// GET ALL PRODUCTS
routes.route("/products").get(getAllProducts)
routes.route("/products/:id").get(getSingleProduct)

module.exports = routes;