const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const terminstatusController = require('../controllers/terminstatusController');

module.exports = router;