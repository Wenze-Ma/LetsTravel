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

            } else {
                res.status(400).json({
                   status:400,
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

module.exports.toggleFavorites = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        let favorites;
        let contains;
        if (user.favorites.some(f => f.xid === req.body.sight.xid)) {
            favorites = user.favorites.filter(f => f.xid !== req.body.sight.xid);
            contains = true;
        } else {
            favorites = [...user.favorites, req.body.sight];
            contains = false;
        }
        user.favorites = favorites;
        user = await user.save();
        res.status(200).json({
            status: 200,
            data: user,
            contains: contains
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports.addFriend = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.targetEmail
        });
        if (user) {
            if (!user.pendingRequest) {
                user.pendingRequest = [req.body.ownerEmail]
            } else {
                if (user.pendingRequest.some(p => p === req.body.ownerEmail)) {
                    res.status(200).json({
                        status: 200,
                        message: "You have already sent the request!"
                    });
                    return;
                }
                if (user.friends.some(f => f === req.body.ownerEmail)) {
                    res.status(200).json({
                        status: 200,
                        message: "You are already friends!"
                    });
                    return;
                }
                user.pendingRequest = [...user.pendingRequest, req.body.ownerEmail]
            }
            user = await user.save();
            res.status(200).json({
                status: 200,
                data: user,
                success: true
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "The user does not exist!"
            });
        }

    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports.getRequests = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            let requests = user.pendingRequest;
            let users = [];
            for (const request of requests) {
                let current = await User.findOne({
                    email: request
                });
                users.push(current);
            }
            res.status(200).json({
                users: users
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports.getFriends = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            let friends = user.friends;
            let users = [];
            for (const friend of friends) {
                let current = await User.findOne({
                    email: friend
                });
                users.push(current);
            }
            res.status(200).json({
                users: users
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}


module.exports.acceptRequest = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.ownerEmail
        });
        if (user) {
            let requests = user.pendingRequest;
            requests = requests.filter(email => email !== req.body.targetEmail);
            user.pendingRequest = requests;

            if (!user.friends) {
                user.friends = [req.body.targetEmail];
            } else {
                user.friends = [...user.friends, req.body.targetEmail];
            }
            user = await user.save();

            let user2 = await User.findOne({
                email: req.body.targetEmail
            })
            if (user2) {
                if (!user2.friends) {
                    user2.friends = [req.body.ownerEmail];
                } else {
                    user2.friends = [...user2.friends, req.body.ownerEmail];
                }
            }
            await user2.save();

            res.status(200).json({
                status: 200,
                data: user,
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports.rejectRequest = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.ownerEmail
        });
        if (user) {
            let requests = user.pendingRequest;
            requests = requests.filter(email => email !== req.body.targetEmail);
            user.pendingRequest = requests;
            user = await user.save();
            res.status(200).json({
                status: 200,
                data: user,
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports.deleteFriend = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.ownerEmail
        });
        if (user) {
            user.friends = user.friends.filter(email => email !== req.body.targetEmail);
            user = await user.save();

            let user2 = await User.findOne({
                email: req.body.targetEmail
            });
            if (user2) {
                user2.friends = user2.friends.filter(email => email !== req.body.ownerEmail);
                await user2.save();

                res.status(200).json({
                    status: 200,
                    data: user,
                    success: true
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

module.exports.sendMessage = async (req, res) => {
    try {
        let sender = await User.findOne({
            email: req.body.sender
        });
        if (sender) {
            const date = new Date();
            if (!sender.messageSent) {
                sender.messageSent = [{email: req.body.receiver, message: req.body.message, time: date}];
            } else {
                sender.messageSent = [...sender.messageSent, {email: req.body.receiver, message: req.body.message, time: date}];
            }
            await sender.save();

            let receiver = await User.findOne({
                email: req.body.receiver
            });
            if (receiver) {
                if (!receiver) {
                    receiver.messageReceived = [{email: req.body.sender, message: req.body.message, time: date}];
                } else {
                    receiver.messageReceived = [...receiver.messageReceived, {email: req.body.sender, message: req.body.message, time: date}];
                }
                await receiver.save();
                res.status(200).json({
                    status: 200,
                    data: {receiver: receiver, sender: sender},
                    success: true
                });
                return;
            }
        }
        res.status(200).json({
            status: 200,
            message: "fail"
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

module.exports.fetchMessages = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.ownerEmail
        });
        if (user) {
            const messagesSent = user.messageSent.filter(m => m.email === req.body.targetEmail);
            messagesSent.map(m => m.isSend = true);
            const messagesReceived = user.messageReceived.filter(m => m.email === req.body.targetEmail);
            messagesReceived.map(m => m.isSend = false);

            res.status(200).json({
                status: 200,
                data: {messagesSent: messagesSent, messagesReceived: messagesReceived}
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}
