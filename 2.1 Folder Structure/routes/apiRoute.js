const express = require("express");
const router = express.Router(); // Router is a class that need to create instance of it to access it functionality here no need to use "new" keyword during creating of instance because when a function or class return Object directly then no need to use new keyword.

// import middleware.
const { authenticateUser, authorizeUser } = require('../middlewares/auth');


// import Handeler / Controller.
const { getUsers, getUserById, createUser } = require("../controllers/userController");

router.get("/users", authenticateUser, getUsers);

router.get("/users/:id", authenticateUser, authorizeUser, getUserById)

router.post("/users", authenticateUser, createUser);

module.exports = router;