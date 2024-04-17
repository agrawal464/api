const express = require("express");

const router = express.Router();

//Routes
router.get("/users",async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers
        .map((user) => `<li>${user.firstName}-${user.email}</li>`)
        .join(" ")}
    </ui>
    `;
    res.send(html);
})


router.get("/api/users", (req, res) => {
    res.setHeader("X-MyName", "Himanshu agrawal");
    //Always add X to a custum header
    // sends a res to header
    //console.log(req.headers);      
    return res.json(users);
});

router.route("/api/users/:id")
    .get( async (req, res) => {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error: "user nat found"});
        //const id = Number(req.params.id);
        //const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch(async(req, res) => {
        //Edit a user
        await User.findByIdAndUpdate(req.params.id,{lastName: "changed"});
        return res.json({ status: "Sucess" });
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "Sucess" });
    });
router.post("/api/users", async (req, res) => {
    // a user
    const body = req.body;
    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All Field Are Requird " });
    }
    users.push({...body, id: users.length + 1});

    //it will create a User
    const result = await User.create({
        firstName: body.first_name,
        lastNamet: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTittle: body.job_title,
    });
   
    return res.status(201).json({ msg: "suceesfully " });
});

model.export =  router;