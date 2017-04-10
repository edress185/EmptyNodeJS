/**
 * Created by Gebruiker on 03/10/2016.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/test");

// making a Schema var.
var Schema = mongoose.Schema;

//setting user schema .
var userSchema = new Schema({
    firstname: { type: String, required: true },
    middlename: { type: String, required: false },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

//exporting user schema

module.exports.userSchema = mongoose.model('User', userSchema);


// setting movie schema
var moviesSchema =new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    duration: { type: Number, required: true },
    tt: { type: Number, required: true }
});

//exporting movie schema.
module.exports.moviesSchema = mongoose.model('movies', moviesSchema);



//setting rating schema.

var ratingSchema =new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true }
});

//exporting rating schema .
module.exports.ratingSchema = mongoose.model('ratings', ratingSchema   );
