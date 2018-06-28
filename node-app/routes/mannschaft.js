const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const mannschaftController = require('../controllers/mannschaftController');

module.exports = router;