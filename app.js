const express = require("express")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const app = express()






// USING ENVIRONMENT VARIABLE
dotenv.config({
    path : "./.env"
})

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "50mb",
	}),
);


// CONTROLLERS
const user = require("./routes/userRoute")
const product = require("./routes/productRoute")
const cart = require("./routes/cartRoute")




// CONTROLLER MIDDLEWARES
app.use("/api/v1", user)
app.use("/api/v1", product)
app.use("/api/v1", cart)



// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
	const errorStatus = err.statuscode || 500;
	const message = err.message || "Something went wrong";
	const status = err.status || "error";

	res.status(errorStatus).json({
		message,
		status,
	});
});

// EXPORTING THE MODULE
module.exports = app