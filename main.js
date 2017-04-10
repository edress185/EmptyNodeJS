/**
 * Created by Gebruiker on 30/09/2016.
 */
var assert = require('assert');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var Movie = require('./databaseManager.js').moviesSchema;

var     Rating = require('./databaseManager.js').ratingSchema;

var User = require('./databaseManager.js').userSchema;

app.use(express.static('public'));


    var jwt = require('jsonwebtoken');
app.set('private-key', 'super-secret-key');




// login handling
app.route('/api/login').post(function login(req, res) {

    var myusername = req.body.username;
    var mypassword = req.body.password;
    //find user with the same username,password provided

        User.find({username: myusername, password: mypassword}, function (err, result) {
            //new
            if (err) {
                res.status(400).send("please check you credentials");
                console.log(req.body);
            }
            else if (result == "") {
                res.status(403).send("please check you credentials");
                console.log(myusername+" "+mypassword);
                console.log(req.body);


            }

            else {
                // sign token to logged in user.
                var token = jwt.sign({username: myusername}, app.get('private-key'), {
                    expiresIn: 1440
                });
                res.send(token);
            }

        });

});



//handling getting ratings
app.route('/api/ratings').get(function (req, res) {
    var token = req.headers['authorization'];

    // Verify the token (check signature)
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            console.log(err);
            res.status(401).send("please recheck your validation token")
        } else {
            //find ratings with your username signed to them
            Rating.find({username: decoded.username}, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).send("please enter the required fields")
                }
                else {
                    if (result == "") {
                        res.status(400).send("this user does not have any Rating records for this movie in the database");
                    } else {
                        res.status(200).send(result);
                    }
                }
            })

        }
    });


});
// handling updating the ratings
app.route('/api/ratings').put(function (req, res) {
    var title = req.body.title;
    var ratingNumber = req.body.rating;
    var token = req.headers['authorization'];

    // Verify the token (check signature)
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            console.log(err);
            res.status(401).send("Please recheck your validation token ")
        } else {
            //find one  with provided username,tt
            //update rating to new provided rating number
            Rating.findOneAndUpdate({username: decoded.username, title: title}, {rating: ratingNumber}, function (err, rating) {
                //check if ratings is unidentified.
                if (rating == "") {
                    res .status(400).send("an error occurred, please check the tt  for errors, "
                    );
                }
                if (err) {
                    console.log(err);
                    res.status(400).send("please enter required data correctly");
                }
                else {
                    //check if the new and old ratings match
                    if (rating.rating == ratingNumber) {
                        res.status(400).send("The new rating is equal to the old rating, so no changes occured")
                    } else {
                        //check if rating>5
                        if (ratingNumber > 5) {
                            res.status(400).send("the rating should be between 0.5 and 5 increasing by 0.5 steps");

                        }
                        //check if rating <0.5
                        else if (ratingNumber < 0.5) {
                            res.status(400).send("the rating should be between 0.5 and 5 increasing by 0.5 steps");
                        }
                        else {
                            console.log(ratingNumber);
                            if (err) {
                                return err;
                            }
                            else {
                                res.status(200).send("The new Rating for the Movie ")
                            }

                        }
                    }
                }
            });
        }
    });
});

//rating post new handling
app.route('/api/ratings').post(function (req, res) {
    var title = req.body.title;
    var ratingNumber = req.body.rating;
    var token = req.headers['authorization'];
    //first of all verify token
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        // handel error
        if (err) {
            console.log(err);
            res.status(401).send("please check your validation token")
        } else {
            //find rating , to see if it exists in the db.
            Rating.find({username: decoded.username, title: title}, function (err, result) {
                if (result == "") {
                        //find user to see if he exists in db.
                        User.find({
                            username: decoded.username
                        }, function (err, result) {
                            if (err) {
                                console.error(err);
                                res.status(400).send("user not available");
                            }
                            //find movie,to see if it is existing in db.
                            Movie.find({title: title}, function (err, result) {
                                if (result != "") {

                                    //check if rating>5
                                    if (ratingNumber > 5) {
                                        res.status(400).send("the rating should be between 0.5 and 5 increasing by 0.5 steps");

                                    }
                                    //check if rating <0.5
                                    else if (ratingNumber < 0.5) {
                                        res.status(400).send("the rating should be between 0.5 and 5 increasing by 0.5 steps");
                                    }
                                    else {
                                        // if every statement matches then make new rating;
                                        var postRating = new Rating({
                                            "username": decoded.username,
                                            "title": title,
                                            "rating": ratingNumber
                                        });
                                        //save the rating made
                                        postRating.save(function (err) {
                                            if (err) {
                                                 console.log(err);
                                            } else {
                                            }
                                        });
                                    }
                                } else {
                                }
                            });
                        });

                }
                if (err) {
                    console.log(err);
                    res.status(400).send("enter required fields")
                }
                else {
                    res.status(200).send("there is a Rating already for this User and the Movie, try to update the Rating instead of adding a new Rating");
                }


            });

        }

    });


});

//handle deletion of ratings
app.route('/api/ratings').delete(function (req, res) {

    var title = req.body.title;
    var token = req.headers['authorization'];

    // Verify the token (check signature)
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            console.log(err);
            res.status(401).send("please recheck your validation token");
        } else {
            //find rating assigned to username,tt ,then delet   e it.
            Rating.findOneAndRemove({title: title, username: decoded.username}, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).send("please enter required fields")
                }
                else {
                    //check whether if you rated the movie .
                    if (result == "") {
                        res.status(400).send("check your tt, you do not have any ratings for this tt");
                        } else {
                        res.status(200).send("the rating has been deleted");
                    }
                }
            })

        }
    });


});


//handling user post
app.route('/api/users').post(function (req, res) {
    var firstname = req.body.firstname;
    var middlename = req.body.middlename;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = req.body.password;

    //get the username that matches any of the database user's username.
        User.find({username:username},function (err,result) {
            if (err) {
                // in case any of the required fields were not filled in.
                console.error(err);
                res.status(400).send(" please enter valid data, username, firstname, lastname and password are required");
            }
            else if (result == "") {
                //make a new user with values received.
                var postUser = new User({
                    "firstname": firstname,
                    "middlename": middlename,
                    "lastname": lastname,
                    "username": username,
                    "password": password
                });
                // save the new user.
                postUser.save(function (err, result) {
                    if (err) {

                        console.error(err);
                    } else {

                        res.status(200).send("new User: " + username + " added")
                    }
                });

            } else {
            }
        })

});

//handling getting the user.
app.route('/api/users').get(function (req, res) {
    var token = req.headers['authorization'];
    //require verification for signed users, via token.
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401),send("please re-check your token")
        } else {

            User.find(function (err, user) {
                if (err) return console.error(err);
                res.status(200).send(user);

            })

        }
    });


});

//handling getting a user with a specific username.
app.route('/api/users/:username').get(function (req, res) {
    var token = req.headers['authorization'];

    // Verify the token (check signature)
    jwt.verify(token, app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).send("please recheck your token")
        } else {
            //finding the user with a specific username.
            User.find({username: req.params.username}, function (err, user) {


                if (err) {
                    return console.error(err)
                }
                //check if user exists in database
                else if (user == "") {
                    res.status(400).send("the user is not saved in the database");
                }
                else {
                    console.log(user);

                    res.status(200).send(user);
                }
            })


        }
    });
});

//handling of movie getting.
app.route('/api/movies').get(function (req, res) {
    //check if there is no director specified as a string query.
    if (req.query.director == null) {
        Movie.find(function (err, movie) {
            if (err) {
                res.status(400);
                console.log(err);
            }
            else {
                res.status(200).send(movie);
            }


        })
    }
    else {
        // in case there is a director set as string query.
        //find movie with required tt
        Movie.find({director: req.query.director}, function (err, movie) {
            //checking if the director matches any of the directors in movies in db.
            if (movie == "") {
            }
            if (err) {
                console.log(err);
            }

            res.status(200).send(movie);

        })
    }
});

// handling movie search with specific param tt.
app.route('/api/movies/:tt').get(function (req, res) {
    //find movie with tt in database
    Movie.find({tt: req.params.tt}, function (err, movie) {
        //check if there is a movie with this tt;
        if (movie == "") {
            res.status(400).send('there is no movie with this tt')
        }
        if (err) {
            console.log(err);
        }
        else {
            res.status(v).send(movie);
        }


    })

});

//test to make sure the server is running.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


// this part was here to add movies inside the database(mongoose), for testing and further development purposes.

 app.route('/api/movies').post(function (req, res) {
 var title = req.body.title;
 var director = req.body.director;
 var description = req.body.description;
 var publicationdate = req.body.year;
 var duration = req.body.duration;
 var tt = req.body.tt;
 // Verify the token (check signature)

 Movie.find({tt: tt}, function (err, movie) {
 // check if there is a movie with the same tt in db
 if (movie == "") {
 // make a new movie
 var postMovie = new Movie(
 {
 "title": title,
 "director": director,
 "description": description,
 "year": publicationdate,
 "duration": duration,
 "tt": tt
 }
 );
 // save the new movie
 postMovie.save(function (err, result) {
 if (err) {
 return console.error(err);
 }
 else {
 res.send("Successfully added Movie: " + title)
 }
 });

 } else {
 res.send('This movie already exists')
 }
 });
 });
