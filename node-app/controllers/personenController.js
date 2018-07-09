const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Personen = require("../models/personen");
const jwt = require("jsonwebtoken");


exports.personen_get = (req, res, next) => {
  Personen.findById( req.params.userID )
  .select("vorname nachname email personenBild").exec()
  .then(doc => {
    console.log("From database", doc);
    if (doc) {
      res.status(200).json({
        person: doc
      });
    } else {
      res
        .status(404)
        .json({ message: "No valid Person found for provided UserID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};

exports.personen_update = (req, res, next) => {
  //TODO: Überprüfung ob geänderte mail bereits existiert 
  
 const updateOps = {};
  for (var ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log("11");
  Personen.update({ _id: req.params.userID }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Person updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.personen_update_password = (req, res, next) => {
  //TODO: Überprüfung ob geänderte mail bereits existiert 
  
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
  Personen.update({ _id: req.params.userID }, { password: hash })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Person password updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
}
})
};

exports.personen_update_picture = (req, res, next) => {
  Personen.update({ _id: req.params.userID }, { personenBild: req.file.path })
  .exec()
  .then(result => {
    res.status(200).json({
      message: "PersonenBild updated"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

};

exports.personen_signup = (req, res, next) => {
  console.log(req.file);
  Personen.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new Personen({
              _id: new mongoose.Types.ObjectId(),
              vorname: req.body.vorname,
              nachname: req.body.nachname,
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          };
        });
      }
    });
};

exports.personen_login = (req, res, next) => {
  Personen.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userID: user[0]._id
            },
            "basldjgjsdfhgjksjdfösgjhslfhlj789er7t89eusdhvl",
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.personen_delete = (req, res, next) => {
  Personen.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};