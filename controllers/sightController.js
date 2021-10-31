const Sight = require("../models/Sight");

module.exports.getSight = async (req, res) => {
    try {
        let sight = new Sight({
            "xid": req.body.xid,
            "name": req.body.name,
            "address": req.body.address,
            "rate": 0.0,
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

module.exports.update = async (req, res) => {
    try {
        Sight.findOneAndUpdate({xid: req.body.xid}, {
            rate: req.body.rate,
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
