const Sight = require("../models/Sight");
const Session = require("../models/Session");
const User = require("../models/User");

module.exports.getSight = async (req, res) => {
    try {
        let sight = new Sight({
            "xid": req.body.xid,
            "name": req.body.name,
            "address": req.body.address,
            "rate": [],
            "wikidata": req.body.wikidata,
            "kinds": req.body.kinds,
            "preview": req.body.preview,
            "wikipedia_extracts": req.body.wikipedia_extracts,
            "comments": [],
        });
        let findSight = await Sight.findOne({
            xid: req.body.xid
        });
        if (findSight) {
            res.json({
                existed: true,
                data: findSight
            });
            return;
        }
        sight = await sight.save();
        res.status(200).json({
            status: 200,
            data: sight
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        Sight.findOneAndUpdate({xid: req.body.xid}, {
            comments: req.body.comments
        }, {new: true}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    sight: result
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

module.exports.updateRate = async (req, res) => {
    try {
        Sight.findOne({xid: req.body.xid}, async (err, result) => {
            if (err) {
                res.send(err);
            } else {
                let rates = result.rates
                let session = await Session.findOne({
                    session: decodeURIComponent(req.cookies['lets_travel_cookie'])
                });
                if (session) {
                    let user = await User.findOne({
                        _id: session.user
                    })
                    if (user) {
                        if (rates.some(e => e.user === user.email)) {
                            const index = rates.findIndex(obj => obj.user === user.email);
                            rates[index].rate = req.body.rate;
                        } else {
                            rates = [...rates, {user: user.email, rate: req.body.rate}];
                        }
                        Sight.findOneAndUpdate({xid: req.body.xid}, {
                            rates: rates
                        }, {new: true}, (err, result) => {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({
                                    sight: result
                                });
                            }
                        });
                    }
                }

            }
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

module.exports.getStars = async (req, res) => {
    try {
        let findSight = await Sight.findOne({
            xid: req.params.xid
        });
        if (findSight) {
            res.json({
                rate: findSight.rates.filter(e => e.user === req.params.email)[0].rate
            });
            return;
        }
        res.json({
            rate: 0
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}
