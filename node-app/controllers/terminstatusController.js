const Terminstatus = require("../models/terminstatus");

exports.terminstatus_update = (req, res, next) => {
  Terminstatus.update({ _id: req.params.appointmentID}, { status: req.body.status })
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Terminstatus updated"
    }); 
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};

exports.terminstatus_get = (req, res, next) => {
  console.log("check");
  Terminstatus.find({ Termin_ID: req.params.appointmentID })
    .select("status personen_ID")
    .exec()
    .then(docs => {
      const response = {
        terminstatuse: docs.map(doc => {
          return {
            status: doc.status,
            personen_ID: doc.personen_ID
          };
        })
      };
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};