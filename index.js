const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;
//Middleware - plugin(which store or show a data)
app.use(express.urlencoded({extended: false}))

//THis is middleware one if it will not give response to next it will hold the request
app.use((req,res,next) => {
    console.log("hello from middleware 1");
    fs.appendFile(`log.txt`,`\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data) => {
        next();
    })
    //res.json({msg:"hello from middleware 1" });
    
});



app.get("/api/users",(req, res) => {
    res.setHeader("X-MyName","Himanshu agrawal");  
    //Always add X to a custum header
    // sends a res to header
    //console.log(req.headers);      
    return res.json(users);
});

app.route("/api/users/:id")
.get((req, res) => {
    
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res) => {
    //Edit a user
    return res.json({status: "pending"});
})
.delete((req,res) => {
    const body = req.body
    users.pop(body);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data) => {
        return res.json({status: "success",id: users.length });
    });
});
app.post("/api/users",(req,res) => {
    // a user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender|| !body.job_title){
        return res.status(400).json({msg: "All Field Are Requird "});
    }
    users.push(body);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data) => {
        return res.status(201).json({status: "success",id: users.length });
    });
    
});

app.listen(PORT, () => console.log(`server started at PORT 8000`));