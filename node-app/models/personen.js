/**
 * Created by oehlersj on 21.06.2018.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonenSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        vorname: {type: String, required: true, max: 100},
        nachname: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        email: {type: String, 
            required: true, 
            max: 100,
            unique: true, 
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
    }
);

//Export model
module.exports = mongoose.model('Personen', PersonenSchema);