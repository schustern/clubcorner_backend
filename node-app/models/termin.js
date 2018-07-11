/**
 * Created by oehlersj on 20.06.2018.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TermineSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        ersttermin_ID: { type: String, default: "" },
        ort: { type: String, max: 100, required: true },
        datum: { type: Date, required: true },
        enddatum: { type: Date, default: "" },
        mannschafts_ID: { type: Number, required: true },
        gegner: { type: String, max: 100, default: "" },
        dauer: { type: Number, required: true }
    }
);

module.exports = mongoose.model('Termine', TermineSchema);