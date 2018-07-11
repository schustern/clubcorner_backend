const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const mannschaftController = require('../controllers/mannschaftController');



router.get("/:mannschaftsID",checkAuth, mannschaftController.getMannschaftbyID);


router.post("/create/:userID",checkAuth, mannschaftController.mannschaft_create);


router.delete("/:mannschaftsID", checkAuth, mannschaftController.mannschaft_delete);



module.exports = router;





