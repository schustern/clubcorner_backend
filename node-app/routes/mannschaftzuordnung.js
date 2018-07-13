const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const mannschaftzuordnungController = require('../controllers/mannschaftzuordnungController');

router.get("/team/:userID",checkAuth, mannschaftzuordnungController.getMannschaftByZuordnung);

router.get("/players/:teamID",checkAuth, mannschaftzuordnungController.getSpielerByZuordnung);

router.delete("/:teamID/:userID",checkAuth, mannschaftzuordnungController.deleteSpielerFromTeam);
//Statuse löschen bei mannschaftszuordnung_delete

router.post("/:userID",checkAuth, mannschaftzuordnungController.addSpielerToTeam);
//join team (Add_user) mit Erstellung der Terminstatus-Objekte 

module.exports = router;