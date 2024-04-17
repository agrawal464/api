const express = require("express");
const {connectMongoDb} = require('./connection')

const userRouter = require("./routes/user");
const {logreqres} = require("./middlewares");

const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2");

//Middleware - plugin(which store or show a data)
app.use(express.urlencoded({ extended: false }))
//THis is middleware one if it will not give response to next it will hold the request
app.use(logreqres("log.txt"));

//Routers
app.use("/user",userRouter);

app.listen(PORT, () => console.log(`server started at PORT 8000`));