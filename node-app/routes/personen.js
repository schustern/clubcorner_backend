const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const personenController = require('../controllers/personenController');


router.get("/", personenController.personen_get);
//router.get("/:personenId", personenController.personen_get_person);

module.exports = router;