/**
 * Created by oehlersj on 21.06.2018.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MannschaftSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        anmeldecode: {type: String, max: 100, required: true},
        jugend: {type: String, max: 100, required: true},
        mannschaftsgrad: {type: Number},
        name: {type: String, max: 100, required: true},
        saison: {type: String, max: 100, required: true},
    }
);

//Export model
module.exports = mongoose.model('Mannschaft', MannschaftSchema);