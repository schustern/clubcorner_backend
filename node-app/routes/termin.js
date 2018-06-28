const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const terminController = require('../controllers/terminController');

module.exports = router;