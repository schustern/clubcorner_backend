const mongoose = require("mongoose");
const Termin = require("../models/termin");
const Terminstatus = require("../models/terminstatus");
const Mannschaftzuordnung = require("../models/mannschaftszuordnung");


exports.create = (req, res, next) => {

    //Falls Enddatum mitgegeben wurde findet der Termin alle 7 Tage erneut statt
    var times = 0;
    if (req.body.enddatum != "") {
        const span = req.body.enddatum.map - req.body.datum.now();
        times = span / 604800000;
    }
    const timesRounded = Math.floor(times);
    const termin = new Termin({
        _id: new mongoose.Types.ObjectId(),
        ort: req.body.ort,
        datum: req.body.datum,
        mannschafts_ID: req.body.mannschafts_ID,
        enddatum: req.body.enddatum,
        gegner: req.body.gegner,
        dauer: req.body.dauer
    });
    termin.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Termin created"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        //Für jedes Teammitglied ein Terminstatus-Objekt erzeugen
        const mannschaftMitglieder;
        const mannschaftLength;

Mannschaftzuordnung.find({ mannschafts_ID: termin.mannschafts_ID})
.select("personen_ID")
.exec
.then(docs => {
    mannschaftMitglieder = docs;

    mannschaftLength = mannschaftMitglieder.length;
    for (var i = 0; i < mannschaftLength; i++){
        const terminstatus = new Terminstatus({
            _id: new mongoose.Types.ObjectId(),
            personen_ID: mannschaftMitglieder[i].personen_ID,
            Termin_ID: termin._id
        });
        terminstatus.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
        }});

    //Falls ein sich wiederholender Termin vorliegt
    const ersterTermin_ID = termin._id.toString();
    for (var i = 0; i < timesRounded; i++) {
        var wiederholungstermin = new Termin({
            _id: new mongoose.Types.ObjectId(),
            ersttermin_ID: ersterTermin_ID,
            ort: req.body.ort,
            datum: new Date(req.body.datum.now() + (i + 1) * 604800000),
            mannschafts_ID: req.body.mannschafts_ID,
            enddatum: req.body.enddatum,
            gegner: req.body.gegner,
            dauer: req.body.dauer
        });
        wiederholungstermin.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: (i + 1).toString + ": Termin created"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
           
             //Für jedes Teammitglied ein Terminstatus-Objekt erzeugen

             for (var i = 0; i < mannschaftLength; i++){
                const terminstatus = new Terminstatus({
                    _id: new mongoose.Types.ObjectId(),
                    personen_ID: mannschaftMitglieder[i].personen_ID,
                    Termin_ID: wiederholungstermin._id,
                    ersttermin_ID: wiederholungstermin.ersttermin_ID
                });
                terminstatus.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    })
                }
    }
};

exports.termin_delete = (req, res, next) => {
    Termin.remove({ _id: req.params.appointmentID})
    .exec()
    then(result => {
        Terminstatus.remove({Termin_ID: req.params.appointmentID})
        .exec
        .then(result => {
        })
      res.status(200).json({
        message: "Termin and Terminstatus for all Personen deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.termin_delete_all = (req, res, next) => {
    Termin.remove({ ersttermin_ID: req.params.firstAppointmentID })
    .exec()
    .then(result => {
        Terminstatus.remove({ersttermin_ID: req.params.firstAppointmentID })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "All consecutive Termin and Terminstatus for all Personen deleted"
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.termin_update = (req, res, next) => {
    const updateOps = {};
    for (var ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Termin.update({ _id: req.params.userID }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: "Termin updated"
        }); 
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

exports.termin_get = (req, res, next) => {
    Termin.find({ mannschafts_ID: req.params.teamID })
        .select("_id ersttermin_ID ort datum enddatum mannschafts_ID ist_wiederholend gegner")
        .exec()
        .then(docs => {
            const response = {
                termine: docs.map(doc => {
                    return {
                        _id: doc._id,
                        ort: doc.ort,
                        datum: doc.datum,
                        mannschafts_ID: doc.mannschafts_ID,
                        enddatum: doc.enddatum,
                        gegner: doc.gegner,
                        dauer: doc.dauer
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