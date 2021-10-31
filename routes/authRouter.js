const router = require("express").Router();
const userController = require("../controllers/userController");

// auth login
router.get("/getUser", userController.getCurrentUser);


module.exports = router;
