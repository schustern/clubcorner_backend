const Terminstatus = require("../models/terminstatus");

exports.terminstatus_update = (req, res, next) => {
const updateOps = {};
  for (var ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Terminstatus.update({ _id: req.params.appointmentstatusID }, { $set: updateOps })
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
    .select("status personen_ID _id")
    .exec()
    .then(docs => {
      const response = {
        terminstatuse: docs.map(doc => {
          return {
            status: doc.status,
            personen_ID: doc.personen_ID,
            _id: doc._id
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