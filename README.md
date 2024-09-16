# Nodejs and Express E-Commerce BAckend Application 

I developed the E-Commerce Nodejs Backend Application having lots of functionality like:

- Authentication and Authorization
- All custom middlewares and utilities that help the application become modular and faster by more 30% - 40%
  
<p>
  <a  href="https://documenter.getpostman.com/view/21160394/2sAXqp83gH" target="_blank"> 📗 Check out Documentation 👈</a>
</p>



### &nbsp;
Project Setup
-------------------------------------------------

Make a ```.env``` file inside the config folder
and add the following key-value pair

```javascript
PORT = 8000 //port no
DB_URI = //MongoDB connection URL
JWT_EXPIRES = 7d //no of days to expire the JWT tokens
JWT_SECRET_KEY = //Your Secrete key
```
make sure your MongoDB server allows your IP address to access the database or you can set it to allow access to anyone

&nbsp;
run the command to initialize the application
```
npm install
yarn //In case your project does not initialize the yarn should be installed in your system before running this command
```

To start the project run
```
npm start
npm run dev s //running in development mode
```
