const mongoose = require("mongoose");
const Termin = require("../models/termin");
const Terminstatus = require("../models/terminstatus");

exports.create = (req, res, next) => {

//Falls wiederholend findet der Termin alle 7 Tage erneut statt
    if(req.body.ist_wiederholend){
        const span = req.body.enddatum.now() - req.body.datum.now();
        const times = span / 604800000; 
        const timesRounded = Math.floor(times);
for(var i=0; i < timesRounded; i++){
    const termin = new Termin({
        _id: new mongoose.Types.ObjectId(),
    ort: req.body.ort,
    datum: req.body.datum,
    mannschafts_ID: req.body.mannschafts_ID,
    enddatum: req.body.mannschafts_ID,
    ist_wiederholend: req.body.mannschafts_ID,
    gegner: {type: String, max: 100}
}
        
    }else{

    };
    _id: new mongoose.Types.ObjectId(),
    ort: req.body.ort,
    datum: req.body.datum,
    mannschafts_ID: req.body.mannschafts_ID,
    
    enddatum: req.body.mannschafts_ID,
    ist_wiederholend: req.body.mannschafts_ID,
    gegner: {type: String, max: 100}
    
})
};

exports.termin_delete = (req, res, next) => {
};

exports.termin_update = (req, res, next) => {
};

exports.termin_get_all = (req, res, next) => {
    Termin.find({ Termin_ID: req.params.appointmentID })
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

module.exports = router;
