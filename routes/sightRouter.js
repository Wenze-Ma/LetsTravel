const express = require("express");
const sightController = require("../controllers/sightController");
const router = express.Router();

router.post("/getSight", sightController.getSight);

router.put("/update", sightController.update);

module.exports = router;
