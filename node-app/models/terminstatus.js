/**
 * Created by oehlersj on 25.06.2018.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TerminstatusSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        personen_ID: {type: Schema.Types.ObjectId, ref: 'Personen', required: true},
        Termin_ID: {type: Schema.Types.ObjectId, ref: 'Termine', required: true},
        status: {type: Number
            , default: 0}
    }
);

//Export model
module.exports = mongoose.model('Terminstatus', TerminstatusSchema);