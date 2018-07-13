const mongoose = require("mongoose");
const Mannschaftzuordnung = require("../models/mannschaftszuordnung");
const Mannschaft = require("../models/mannschaft");
const Termin = require("../models/termin");
const Terminstatus = require("../models/terminstatus");

exports.getMannschaftByZuordnung = (req, res, next) => {
    Mannschaftzuordnung.find({ personen_ID: req.params.userID })
        .select("mannschafts_ID mannschafts_name ist_Trainer")
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length == 0) {
                //Code Generator
                const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                const uniqid = randLetter + Date.now();

                const mannschaft = new Mannschaft({
                    _id: new mongoose.Types.ObjectId(),
                    anmeldecode: uniqid,
                    jugend: "A",
                    mannschaftsgrad: 1,
                    name: "A 1 2016",
                    saison: "2016",
                    male: true
                });
                mannschaft.save()

                const mannschaftzuordnung = new Mannschaftzuordnung({
                    _id: new mongoose.Types.ObjectId(),
                    personen_ID: req.params.userID,
                    mannschafts_ID: mannschaft._id,
                    ist_Trainer: true,
                    mannschafts_name: mannschaft.name
                });
                mannschaftzuordnung.save()

                docs.push(mannschaftzuordnung);
            }
            const response = {
                mannschaftzuordnungen: docs.map(doc => {
                    return {
                        mannschafts_ID: doc.mannschafts_ID,
                        mannschafts_name: doc.mannschafts_name,
                        ist_Trainer: doc.ist_Trainer
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

exports.getSpielerByZuordnung = (req, res, next) => {
    Mannschaftzuordnung.find({ mannschafts_ID: req.params.teamID })
        .select("personen_ID")
        .exec()
        .then(docs => {
            const response = {
                mannschaftzuordnungen: docs.map(doc => {
                    return {
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

exports.addSpielerToTeam = (req, res, next) => {
    Mannschaft.find({ anmeldecode: req.body.anmeldecode })
        .select("name _id")
        .exec()
        .then(team => {
            console.log("resultname" + team[0].name);
            const mannschaftszuordnung = new Mannschaftzuordnung({
                //Spieler zu Mannschafts hinzufügen
                _id: new mongoose.Types.ObjectId(),
                personen_ID: req.params.userID,
                mannschafts_ID: team[0]._id,
                mannschafts_name: team[0].name
            });
            mannschaftszuordnung.save()
                .then(result => {
                    //Terminstatus erstellen

                    Termin.find({ mannschafts_ID: team[0]._id })
                        .select("_id ersttermin_ID")
                        .exec()
                        .then(docs => {

                            for (var i = 0; i < docs.length; i++) {
                                console.log("termin" + docs[i]);

                                var terminstatus = new Terminstatus({
                                    _id: new mongoose.Types.ObjectId(),
                                    personen_ID: req.params.userID,
                                    Termin_ID: docs[i]._id,
                                    ersttermin_ID: docs[i].ersttermin_ID,
                                });
                                terminstatus.save()
                                    .then(result => {
                                        console.log(result);
                                    });
                            };
                        });
                    res.status(201).json({
                        message: "Spieler zur Mannschaft hinzugefügt. Ebenfalls alle Terminstatuse"
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

exports.deleteSpielerFromTeam = (req, res, next) => {
    Mannschaftzuordnung.remove({ personen_ID: req.params.userID, mannschafts_ID: req.params.teamID })
        .exec()
        .then(result => {
            //Terminstatuse löschen
            Termin.find({ mannschafts_ID: req.params.teamID })
                .select("_id")
                .exec()
                .then(docs => {
                    for (var i = 0; i < docs.length; i++) {
                        Terminstatus.remove({ personen_ID: req.params.userID, Termin_ID: docs[i]._id })
                    };
                    res.status(200).json({
                        message: "Spieler Mit Terminstatus aus Team entfernt"
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
};