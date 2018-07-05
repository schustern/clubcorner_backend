const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const terminController = require('../controllers/terminController');

//Erstellt für jedes Teammitglied ein terminStatus Objekt
router.post("/:teamID", checkAuth, terminController.create);

//Löscht für jedes (verbleibende) Teammitglied das zugehörige terminStatus Objekt
router.delete("/:teamID", checkAuth, terminController.termin_delete);

router.patch("/:appointmentID", checkAuth, terminController.termin_update);

//hole alle Termin Objekte
//hole das zum Nutzer passende terminstatusobjekt
router.get("/:teamID", checkAuth, terminController.termin_get_all);

module.exports = router;
