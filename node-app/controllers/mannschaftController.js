const mongoose = require("mongoose");
const Mannschaft = require("../models/mannschaft");

//geschlecht fehlt

//exports.mannschaft_getbyID = (req, res, next) => {
//    res.status(200).json({
//        message: 'Handling GET requests to /mannschaft'
//    });
//};

exports.mannschaft_create = (req, res, next) => {
    Mannschaft.find({ name: req.body.name })
        .exec()
        .then(mannschaft => {
        if (mannschaft.length >= 1) {
        return res.status(409).json({
            message: "Mannschaft exists"
        });
    } else {
                const mannschaft = new Mannschaften({
                    mannschafts_ID: new mongoose.Types.ObjectId(),
                    anmeldecode: Math.random().toString(36).substring(2,9),    //9-Stelliger Random Code aus Zahlen und Buchstaben
                    jugend: req.body.jugend,
                    mannschaftsgrad: req.body.mannschaftsgrad,
                    name:  req.body.jugend + " " + req.body.mannschaftsgrad + " " + req.body.saison ,
                    saison: req.body.saison
                });
        mannschaft
            .save()
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
    Mannschaften.remove({ _id: req.params.mannschafts_ID })
        .exec()
        .then(result => {
        res.status(200).json({
        message: "Mannschaft deleted"
    });
})
.catch(err => {
        console.log(err);
    res.status(500).json({
        error: err
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
                                                }



