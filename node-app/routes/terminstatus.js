const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const terminstatusController = require('../controllers/terminstatusController');

router.patch("/:appointmentstatusID", checkAuth, terminstatusController.terminstatus_update);

router.get("/:appointmentID", checkAuth, terminstatusController.terminstatus_update);

module.exports = router;