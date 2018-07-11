const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const mannschaftzuordnungController = require('../controllers/mannschaftzuordnungController');

router.get("/team/:userID",checkAuth, mannschaftzuordnungController.getMannschaftByZuordnung);

router.get("/players/:teamID",checkAuth, mannschaftzuordnungController.getSpielerByZuordnung);

router.delete("/:teamID/:userID",checkAuth, mannschaftzuordnungController.deleteSpielerFromTeam);

module.exports = router;
