const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;
//Middleware - plugin(which store or show a data)
app.use(express.urlencoded({extended: false}))

app.get("/api/users",(req, res) => {
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
        return res.json({status: "pending"});
});
app.post("/api/users",(req,res) => {
    // a user
    const body = req.body
    users.push(body);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data) => {
        return res.json({status: "success",id: users.length + 1});
    });
    
});

app.listen(PORT, () => console.log(`server started at PORT 8000`))