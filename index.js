const app = require("./app")
const dotenv = require("dotenv")
const connectDB = require("./config/database")








// USING ENVIRONMENT VARIABLE
dotenv.config({path:'./config/.env'});

// CONNECTION TO DATABASE
connectDB()



const server = app.listen(process.env.PORT, () => {
	console.log(`server is running at ${process.env.PORT}`);
});
