const mongoose = require("mongoose");
const Mannschaft = require("../models/mannschaft");


//exports.mannschaft_getbyID = (req, res, next) => {
//    res.status(200).json({
//        message: 'Handling GET requests to /mannschaft'
//    });
//};

exports.mannschaft_create = (req, res, next) => {
    Mannschaft.find({ name: req.body.jugend + " " + req.body.mannschaftsgrad + " " + req.body.saison })
        .exec()
        .then(mannschaft => {
            if (mannschaft.length >= 1) {
                return res.status(409).json({
                    message: "Mannschaft already exists"
                });
            } else {
                const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                const uniqid = randLetter + Date.now();

                const mannschaft = new Mannschaften({
                    _id: new mongoose.Types.ObjectId(),
                    anmeldecode: uniqid,
                    jugend: req.body.jugend,
                    mannschaftsgrad: req.body.mannschaftsgrad,
                    name: req.body.jugend + " " + req.body.mannschaftsgrad + " " + req.body.saison,
                    saison: req.body.saison,
                    male: req.body.male
                });
                mannschaft
                    .save()

                const mannschaftzuordnung = new Mannschaftzuordnung({
                    _id: new mongoose.Types.ObjectId(),
                    personen_ID: req.params.userID,
                    mannschafts_ID: mannschaft._id,
                    ist_Trainer: true,
                    mannschafts_name: mannschaft.name
                });
                mannschaftzuordnung.save()

                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Mannschaft created"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};

exports.mannschaft_delete = (req, res, next) => {
    Mannschaften.remove({ _id: req.params.teamID })
        .exec()
        .then(result => {
            Mannschaftzuordnung.remove({ mannschafts_ID: req.params.teamID })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: "Mannschaft and Zuordnungen deleted"
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                });
        });
};

exports.getMannschaftbyID = (req, res, next) => {
    Mannschaft.find({ mannschafts_ID: req.params.teamID })
        .exec()
        .then(docs => {
            const response = {
                Mannschaften: docs.map(doc => {
                    return {
                        anmeldecode: doc.anmeldecode,
                        _id: doc._id,
                        name: doc.name,
                        jugend: doc.jugend,
                        mannschaftsgrad: doc.mannschaftsgrad,
                        saison: doc.saison,
                        male: doc.male
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



