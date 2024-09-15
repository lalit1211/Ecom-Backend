const mongoose = require('mongoose')
const dotenv = require("dotenv")

const connectDB = ()=>{
    mongoose
		.connect(
			process.env.DB_URI
		)
		.then(() => {
			console.log("Database connected successfully.");
		})
		.catch((err) => {
			console.log(err);
		});

}

module.exports = connectDB