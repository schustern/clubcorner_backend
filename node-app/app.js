const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const personenRoutes = require('./routes/personen')
const mannschaftRoutes = require('./routes/mannschaft');
const mannschaftzuordnungRoutes = require('./routes/mannschaftzuordnung');
const terminRoutes = require('./routes/termin');
const terminstatusRoutes = require('./routes/terminstatus');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

var mongoDB = 'mongodb://127.0.0.1:27018';
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



app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports = app;