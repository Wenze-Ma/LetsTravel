const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let user = new User(req.body);
        user = await user.save();
        res.status(200).json({
            status: 200,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
});

router.get("/all", async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({
            status: 200,
            data: users
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
});

router.get("/:email", async (req, res) => {
   try {
       let user = await User.findOne({
           email: req.params.email
       });
       if (user) {
           res.status(200).json({
               status: 200,
               data: user
           });
       } else {
           res.json({
              data: {}
           });
       }
   } catch (err) {
       res.status(400).json({
           status: 400,
           message: err.message
       });
   }
});

module.exports = router;

