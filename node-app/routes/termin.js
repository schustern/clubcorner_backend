const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const terminController = require('../controllers/terminController');

//Erstellt ebenfalls für jedes Teammitglied ein terminStatus Objekt
router.post("/:teamID", checkAuth, terminController.create);

//Löscht ebenfalls für jedes (verbleibende) Teammitglied das zugehörige terminStatus Objekt
router.delete("/:appointmentID", checkAuth, terminController.termin_delete);

//Löscht ebenfalls für jedes (verbleibende) Teammitglied das zugehörige terminStatus Objekt
router.delete("/delete_all/:appointmentID", checkAuth, terminController.termin_delete_all);

router.patch("/:appointmentID", checkAuth, terminController.termin_update);
//Ändert nur den gerade ausgewählten Termin

//hole alle Termin Objekte und das zum Nutzer passende terminstatusobjekt
router.get("/:teamID", checkAuth, terminController.termin_get);

module.exports = router;
