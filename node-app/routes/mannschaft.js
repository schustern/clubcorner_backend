const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const mannschaftController = require('../controllers/mannschaftController');

//router.post("/create", mannschaftController.create_team);

module.exports = router;