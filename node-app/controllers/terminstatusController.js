const Terminstatus = require("../models/terminstatus");

exports.terminstatus_update = (req, res, next) => {
  const id = req.params.appointmentstatusID;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Terminstatus.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Terminstatus updated"
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.terminstatus_get = (req, res, next) => {
  Terminstatus.find({ Termin_ID: req.params.appointmentID })
    .select("status personen_ID")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
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