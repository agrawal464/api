const express = require("express");
const { handleGetAllUsers, handleCreateNewUser,handleDeleteUserById,handlegetUserById, handleUpdateUserById } = require("../controllers/user");

const router = express.Router();

//Routes

router.route("/")
    .get( handleGetAllUsers)
    .post(handleCreateNewUser);

router.route("/:id")
    .get(handlegetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;