const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose
		.connect(
			"mongodb+srv://lalitpratapsingh2002:lalit123@cluster0.xej91.mongodb.net/",
		)
		.then(() => {
			console.log("Database connected successfully.");
		})
		.catch((err) => {
			console.log(err);
		});

}

module.exports = connectDB