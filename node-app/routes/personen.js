const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const personenController = require('../controllers/personenController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});



router.get("/:userID", checkAuth, personenController.personen_get);


//Passwort und mail sind nicht änderbar
router.patch("/update/:userID", checkAuth, personenController.personen_update);


//router.patch("/update_password/:userID", checkAuth, personenController.personen_update_password);

router.patch("/update_picture/:userID", upload.single('personenBild'), checkAuth, personenController.personen_update_picture);

router.post("/login", personenController.personen_login);

router.post("/signup", personenController.personen_signup);

router.delete("/:userID", checkAuth, personenController.personen_delete);

module.exports = router;