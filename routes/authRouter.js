const router = require("express").Router();
const Session = require("../models/Session");
const User = require("../models/User");

// auth login
router.get("/getUser/:cookie", async (req, res) => {
    try {
        let session = await Session.findOne({
            session: decodeURIComponent(req.params.cookie)
        });
        if (session) {
            let user = await User.findOne({
                _id: session.user
            })
            if (user) {
                res.status(200).json({
                    status: 200,
                    data: user
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
})


module.exports = router;
