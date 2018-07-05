const mongoose = require("mongoose");
const Termin = require("../models/termin");
const Terminstatus = require("../models/terminstatus");

exports.create = (req, res, next) => {

    //Falls wiederholend findet der Termin alle 7 Tage erneut statt
    var times = 1;
    if (req.body.ist_wiederholend) {
        const span = req.body.enddatum.now() - req.body.datum.now();
        times = span / 604800000;
        const timesRounded = Math.floor(times);
    }
    for (var i = 0; i < timesRounded; i++) {
        var termin = new Termin({
            _id: new mongoose.Types.ObjectId(),
            ort: req.body.ort,
            datum: req.body.datum,
            mannschafts_ID: req.body.mannschafts_ID,
            enddatum: req.body.enddatum,
            ist_wiederholend: req.body.ist_wiederholend,
            gegner: req.body.gegner
        });
        termin.save()
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
    }
};

exports.termin_delete = (req, res, next) => {

};

exports.termin_delete_all = (req, res, next) => {

};

exports.termin_update = (req, res, next) => {
};

exports.termin_get = (req, res, next) => {
    Termin.find({ mannschafts_ID: req.params.teamID })
        .select("_id erstterminID ort datum enddatum mannschafts_ID ist_wiederholend gegner")
        .exec()
        .then(docs => {
            const response = {
                termine: docs.map(doc => {
                    return {
                        _id: new mongoose.Types.ObjectId(),
                        ort: doc.ort,
                        datum: doc.datum,
                        mannschafts_ID: doc.mannschafts_ID,
                        enddatum: doc.enddatum,
                        ist_wiederholend: doc.ist_wiederholend,
                        gegner: doc.gegner
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

module.exports = router;
