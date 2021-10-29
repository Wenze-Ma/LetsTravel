const express = require("express");
const userController = require("../controllers/userController")
const router = express.Router();

router.post("/", userController.signUp);

router.get("/all", userController.getAllUsers);

router.get("/login", userController.login).post("/login", userController.login);

router.get("/logout", userController.logout);

router.put("/update", userController.update);

module.exports = router;

