const express = require("express");
const sightController = require("../controllers/sightController");
const router = express.Router();

router.post("/getSight", sightController.getSight);

router.put("/updateComment", sightController.updateComment);

router.put("/updateRate", sightController.updateRate);

router.get("/:xid/:email", sightController.getStars);

module.exports = router;
