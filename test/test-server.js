/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var assert = require('assert');

var Rating = require('../databaseManager.js').ratingSchema;

var User = require('../databaseManager.js').userSchema;



var Movie = require('../databaseManager.js').moviesSchema;


//tests done on movies
describe('Movie', function () {
    //test to find movie


    describe('#find()', function () {
        it('should find movies without error', function (done) {
            Movie.find(function (err, movie) {
                if (err)done(err);
                else done();

            });
        });
    });
});


//user unit test

describe('User', function () {
    //test to save user
    describe('#save()', function () {
        it('should save user without error', function (done) {
            var user = new User({
                "firstname": "jantje",
                "middlename": "jantje",
                "lastname": "jantje",
                "username": "jantj",
                "password": "password1"
            });
            user.save(function (err) {
                if (err) done(err);
                else done();
            });
        });
    });
    //test to find user
    describe('#find()', function () {
        it('should find user', function (done) {
            User.find(function (err, user) {
                if (err)done(err);
                else done();
                console.log(user);
            });
        });
    });


});


//Rating unittest

describe('Rating', function () {
    //test to save ratings
    describe('#save()', function () {
        it('should save rating without error', function (done) {
            var rating = new Rating({
                "username": "jantj",
                "tt": 3,
                "rating": 5
            });
            rating.save(function (err) {
                if (err) done(err);
                else done();
            });
        });
    });
    //test to find ratings
    describe('#find()', function () {
        it('respond with matching rating records', function (done) {
            Rating.find(function (err, rating) {
                if (err)done(err);
                else done();

            });
        });
    });
    //test don to upload rating
    describe('#put()', function () {
        it('updated the rating for the movie', function (done) {
            Rating.findOneAndUpdate({username: "jantj", tt: 3}, {rating: 4}, function (err, rating) {
                if (err)done(err);
                else done();

            });
        });
    });
    // test done to delete rating
    describe('#delete()', function () {
        it('the rating for that movie has been deleted', function (done) {
            Rating.findOneAndRemove({username: "jantj", tt: "3"}, function (err, rating) {
                if (err)done(err);
                else done();

            });
        });
    });
});

*/
