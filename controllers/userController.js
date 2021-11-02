const User = require("../models/User");
const Session = require("../models/Session")
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const gender = req.body.gender !== "other" ? req.body.gender + "/" : "";
        const src = "https://joeschmoe.io/api/v1/" + gender + req.body.first_name;
        let user = new User({
            "email": req.body.email,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "password_hash": hashedPassword,
            "gender": req.body.gender,
            "src": src
        });
        let finduser = await User.findOne({
            email: req.body.email
        });
        if (finduser) {
            res.json({
                existed: true
            });
            return;
        }

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
}

module.exports.getAllUsers = async (req, res) => {
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
}

module.exports.login = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password_hash)) {
                let cookievalue = await bcrypt.hash("secretword", 10);
                cookievalue = cookievalue.split("$").join("");
                cookievalue = cookievalue.split("/").join("");
                res.cookie("lets_travel_cookie", cookievalue)
                    .send({
                        success: true,
                        user: user,
                        first_name: user.first_name,
                        message: "Welcome back"
                    });

                let session = new Session({
                    "user": user._id,
                    "session": cookievalue
                });
                await session.save();
            } else {
                res.json({
                    data: "Incorrect password"
                });
            }
        } else {
            res.json({
                data: "No user with that email"
            });
        }
    } catch
        (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie("lets_travel_cookie").send(200);

    const cookies = req.headers.cookie.split(";");
    let cookievalue = null;
    cookies.forEach(element => {
        if (element.split("=")[0].trim() === "lets_travel_cookie") {
            cookievalue = decodeURIComponent(element.split("=")[1].trim());
        }
    });
    Session.deleteOne({session: cookievalue}, () => {
    })
}

module.exports.update = async (req, res) => {
    try {
        User.findOneAndUpdate({email: req.body.email}, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender
        }, {new: true}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    user: result
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

module.exports.updateAvatar = async (req, res) => {
    try {
        User.findOneAndUpdate({email: req.body.email}, {
            src: req.body.src
        }, {new: true}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    user: result
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

module.exports.getCurrentUser = async (req, res) => {
    try {
        let session = await Session.findOne({
            session: decodeURIComponent(req.cookies['lets_travel_cookie'])
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
}

module.exports.getUserByEmail = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.params.email
        })
        if (user) {
            res.status(200).json({
                status: 200,
                data: user
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}
