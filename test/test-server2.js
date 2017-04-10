/*
/!**
 * Created by Gebruiker on 09/10/2016.
 *!/
var supertest = require('supertest');
var server = supertest.agent("http://localhost:3000");
var should = require('should');
var express = require('express');

var app = express();
var token;
var jwt = require('jsonwebtoken');
app.set('private-key', 'super-secret-key');


//testing for user posting.
// REMARK: 2 different user unittest were made, as post user does not require Authentication, and this needs to be done before login.

describe("post User unittest", function () {


    it("should post the users", function (done) {
        server.post("/api/users")
            .send({
                "firstname": "jantje",
                "lastname": "jantje",
                "username": "jantje3",
                "password": "password3"
            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                else {
                    done()
                }
            });
    });
});


// super test done to log in
describe("login User unittest", function () {


    //sending the token and getting access to list of users
    it("should login the user", function (done) {
        server.post('/api/login')
            .expect(200)
            .send({
                'username': 'jantj',
                'password': 'password1'
            })
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                token = res.text;
                done();

            });
    });
});


//super test done to test: getting list of users + doing the login beforehand.
describe("get User unittest", function () {


    //sending the token and getting access to list of users
    it("should return all the users", function (done) {
        server.get("/api/users")
            .send('Authorization', token)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                else {
                    done()
                }
            });
    });
});




//super test done to test : getting list of movies


describe("Movie unittest", function () {
    it("should return all the movies", function (done) {
        server.get("/api/movies")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                else {
                    done()
                }
            });
    });
});




// related to ratings unittest (CRUD)

describe(" ratings unittest", function login() {
    // runs before all tasks just once: login.


    // test for getting the results of your ratings.
    it("should return all the ratings", function (done) {
        server.get("/api/ratings")
            .expect(200)
            .send('Authorization',token)
            .end(function (err, res) {
                if (err) done(err);
                else {
                    done()
                }
            });

    });

    //test for post user in db
    it("should post the ratings", function (done) {
        server.post("/api/ratings")
            .expect(200)
            .send('Authorization',token)
            .send({
                "username": "jantj",
                "tt": 3,
                "rating": 200

            })
            .end(function (err, res) {
                if (err) done(err);
                else {
                    done()
                }
            });
    });

    // test for uploading the ratings
    it("should upload the rating", function (done) {
        server.put("/api/ratings")
            .expect(200)
            .send('Authorization',token)
            .send({
                "username": "jantj",
                "tt": 3,
                "rating": 200

            })
            .end(function (err, res) {
                if (err) done(err);
                else {
                    done()
                }
            });
    });

    // test done to delete ratings
    it("should delete the ratings", function (done) {
        server.delete("/api/ratings")
            .send('Authorization',token)

            .expect(200)
            .send({
                "tt": 3
            })
            .end(function (err, res) {
                if (err) done(err);
                else {
                    done()
                }
            });
    });
});




*/
