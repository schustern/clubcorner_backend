const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require("mongoose");

const personenRoutes = require('./routes/personen')
const mannschaftRoutes = require('./routes/mannschaft');
const mannschaftzuordnungRoutes = require('./routes/mannschaftzuordnung');
const terminRoutes = require('./routes/termin');
const terminstatusRoutes = require('./routes/terminstatus');

const app = express();

//Optionen der Verbindung
const mongoOptions =
{
    db: {safe: true},
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};

var mongoDB = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/personen', personenRoutes);
app.use('/mannschaft', mannschaftRoutes);
app.use('/mannschaftzuordnung', mannschaftzuordnungRoutes);
app.use('/termin', terminRoutes);
app.use('/terminstatus', terminstatusRoutes);


module.exports = app;