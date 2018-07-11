/**
 * Created by oehlersj on 25.06.2018.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MannschaftszuordnungSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        personen_ID: { type: Schema.Types.ObjectId, ref: 'Personen', required: true },
        mannschafts_ID: { type: Schema.Types.ObjectId, ref: 'Mannschaft', required: true },
        ist_Trainer: { type: Boolean, default: false },
        mannschafts_name: { type: String, required: true}
    }
);

//Export model
module.exports = mongoose.model('Mannschaftzuordnung', MannschaftszuordnungSchema);