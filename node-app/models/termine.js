/**
 * Created by oehlersj on 20.06.2018.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TermineSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        ort: {type: String, max: 100, required: true},
        datum: {type: Date, required: true},
        mannschafts_ID: {type: Number
            , required: true},
        ist_wiederholend: {type: Boolean, default: false},
        gegner: {type: String, max: 100}
    }
);

//Export model
module.exports = mongoose.model('Termine', TermineSchema);