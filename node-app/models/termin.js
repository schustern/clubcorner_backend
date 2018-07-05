/**
 * Created by oehlersj on 20.06.2018.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TermineSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        erstTerminID: {type: Schema.Types.ObjectId, ref: 'Termin', required: true},
        ort: {type: String, max: 100, required: true},
        datum: {type: Date, required: true},
        enddatum: {type: Date},
        mannschafts_ID: {type: Number, required: true},
        ist_wiederholend: {type: Boolean, default: false},
        gegner: {type: String, max: 100, default: ""}
    }
);

//Export model
module.exports = mongoose.model('Termine', TermineSchema);