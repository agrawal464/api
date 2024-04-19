const express = require("express");
const {connectMongoDb} = require("./connection");

const {logreqres} = require("./middlewares");
const userRouter = require("./routes/user");


const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2").then(() => 
console.log("MongoDb connected")
);

//Middleware - plugin(which store or show a data)
//app.use(express.urlencoded({ extended: false }));
app.use(logreqres("log.txt"));

//Routers
app.use("/api/users",userRouter);

app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
