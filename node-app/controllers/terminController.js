const mongoose = require("mongoose");
const Termin = require("../models/termin");
const Terminstatus = require("../models/terminstatus");
const Mannschaftzuordnung = require("../models/mannschaftszuordnung");
async = require("async");



exports.create = (req, res, next) => {
    //Falls Enddatum mitgegeben wurde findet der Termin alle 7 Tage erneut statt
    var times = 0;

    var date = new Date(req.body.datum);

    if (req.body.enddatum != "") {
        var endDate = new Date(req.body.enddatum);

        const span = endDate.getTime() - date.getTime();
        times = span / 604800000;
        console.log("wiederholender Termin" + times)

    }
    const timesRounded = Math.floor(times);
    const termin = new Termin({
        _id: new mongoose.Types.ObjectId(),
        ort: req.body.ort,
        datum: date,
        mannschafts_ID: req.params.teamID,
        enddatum: endDate,
        gegner: req.body.gegner,
        dauer: req.body.dauer
    });
    termin.save()
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    //Für jedes Teammitglied ein Terminstatus-Objekt erzeugen


    Mannschaftzuordnung.find({ mannschafts_ID: req.params.teamID })
        .select("personen_ID")
        .exec()
        .then(zuordnungen => {

            for (var o = 0; o < zuordnungen.length; o++) {
                const terminstatus = new Terminstatus({
                    _id: new mongoose.Types.ObjectId(),
                    personen_ID: zuordnungen[o].personen_ID,
                    Termin_ID: termin._id
                });
                terminstatus.save()
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    })
            }
        });

    //Falls ein sich wiederholender Termin vorliegt
    console.log(" Anzahl an Nachfolgeterminen" + timesRounded);

    const ersterTermin_ID = termin._id.toString();

    for (var i = 0; i < timesRounded; i++) {
        console.log(i + " Versuch");

        var wiederholungstermin = new Termin({
            _id: new mongoose.Types.ObjectId(),
            ersttermin_ID: ersterTermin_ID,
            ort: req.body.ort,
            datum: new Date(date.getTime() + ((i + 1) * 604800000) - 3600000),
            mannschafts_ID: req.params.teamID,
            enddatum: endDate,
            gegner: req.body.gegner,
            dauer: req.body.dauer
        });
        
        console.log("speichern");
        wiederholungstermin.save()
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })

        console.log(wiederholungstermin._id);


        //Für jedes Teammitglied ein Terminstatus-Objekt erzeugen
        //funktioniert noch nicht fehlerfrei. Bisher wird nur zum letzten Wiederholungstermin Terminstatuse erzeugt
        Mannschaftzuordnung.find({ mannschafts_ID: req.params.teamID })
            .select("personen_ID")
            .exec()
            .then(zuordnungenWiederholung => {
                console.log("vor schleife " + wiederholungstermin._id);

                for (var e = 0; e < zuordnungenWiederholung.length; e++) {
                console.log("nach schleife " + wiederholungstermin._id);

                    var wiederholungsTerminstatus = new Terminstatus({
                        _id: new mongoose.Types.ObjectId(),
                        personen_ID: zuordnungenWiederholung[e].personen_ID,
                        Termin_ID: wiederholungstermin._id,
                        ersttermin_ID: termin._id
                    });
                    wiederholungsTerminstatus.save()
                        .then(result => {
                            console.log(result);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        })
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
    res.status(201).json({
        message: "Termin(e) erstellt"
    });
};

exports.termin_delete = (req, res, next) => {
    Termin.remove({ _id: req.params.appointmentID })
        .exec()
    .then(result => {
        Terminstatus.remove({ Termin_ID: req.params.appointmentID })
            .exec()
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
            Terminstatus.remove({ ersttermin_ID: req.params.firstAppointmentID })
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
    Termin.update({ _id: req.params.appointmentID }, { $set: updateOps })
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
    Termin.find({ mannschafts_ID: req.params.teamID})
        .select("_id ersttermin_ID ort datum enddatum  gegner dauer")
        .exec()
        .then(docs => {
            const response = {
                termine: docs.map(doc => {
                    return {
                        _id: doc._id,
                        ort: doc.ort,
                        datum: doc.datum,
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