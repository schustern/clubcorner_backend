const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const personenController = require('../controllers/personenController');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
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

router.get("/", personenController.personen_get);
//router.get("/:personenId", personenController.personen_get_person);

router.post("/login", personenController.personen_login);

router.post("/signup", upload.single('personenBild'), personenController.personen_signup);

router.delete("/:userID", checkAuth, personenController.personen_delete);

module.exports = router;