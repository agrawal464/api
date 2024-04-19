const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find();     
    return res.json(allDbUsers);

}

async function handlegetUserById(req,res){
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error: "user nat found"});
        //const id = Number(req.params.id);
        //const user = users.find((user) => user.id === id);
        return res.json(user);
}

async function handleUpdateUserById(req,res){
    //Edit a user
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "Sucess" });
}
async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Sucess" });
}

async function handleCreateNewUser(req,res){
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
    users.push({ ...body, id: users.length + 1 });

    //it will create a User
    const result = await User.create({
        firstName: body.first_name,
        lastNamet: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTittle: body.job_title,
    });

    return res.status(201).json({ msg: "suceesfully ",id: result_id });
}

module.exports = {
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
};