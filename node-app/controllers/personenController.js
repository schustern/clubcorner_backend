const mongoose = require("mongoose");
const Product = require("../models/personen");


exports.personen_get = (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /personen'
    });
};

/*exports.personen_get_person = (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
};
*/