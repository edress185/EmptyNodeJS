/**
 * Created by Gebruiker on 13/10/2016.
 */


$(function () {
    localStorage.removeItem("movie");
    $('#userdata2').fadeOut(100);



    if (localStorage.getItem("token") != "") {
        $('.afterlogged').append('<ul id="navbarafterlogged" class="nav navbar-nav"> <li  ><a href="/ratings.html">My Ratings</a></li> <li ><a href="/users.html" >Browse Users</a></li> </ul>');
        $('#login-submit').fadeOut(100);
        $('#startrating').fadeOut(100);
        $('#startrate').fadeOut(100);
        $('#rateready').append('<a id="raterelated" href="/ratings.html" class="btn btn-primary" role="button">Start !</a> ');

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/ratings',
            headers: {
                'Authorization': localStorage.getItem("token")
            },
            contentType: "application/json",
            dataType: "JSON",
            success: function (data) {
                console.log("This is the data : " + data);
                console.log('success');
                var ratings = data;
                $.each(ratings, function (i, rating) {

                    $.ajax({
                        type: 'GET',
                        url: 'http://www.omdbapi.com/?t=' + rating.title,
                        success: function (movie) {
                            console.log('success');

                            $('#ratingsdata').append('<div  class="container text-center"><div class="thumbnail" > <div class="caption"><img id="onemoviepic" src=' + movie.Poster + '> <h5 id="title-edit"></h5>' + rating.title + '<br /><di> <br />    Rating: ' + rating.rating + '<div id="' + movie.imdbID + '"><a></br>Delete Rating</a></div></br> <div id="padding-rating-detail" class="container text-center"> <div class="dropdown"> <select class="form-control" id="myrating'+movie.imdbID+'"> <option value="1">1</option> <option value="1.5 ">1.5</option> <option value="2">2</option> <option value="2.5">2.5</option> <option value="3">3</option> <option value="3.5">3.5</option> <option value="4">4</option> <option value="4.5">4.5</option> <option value="5">5</option> </select> </br> </br> </div> <button class="btn btn-default dropdown-toggle" type="button" id="'+movie.imdbID+"5"+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Edit Rating ! </button>    </div>');
                            $("#" + movie.imdbID).on('click', function () {

                                var movieTitle = movie.Title;
                                var mov = {
                                    title: movieTitle
                                };
                                console.log("DELETED MOVIE TITLE :" + movieTitle);
                                $.ajax({
                                    type: 'DELETE',
                                    url: 'http://localhost:3000/api/ratings',
                                    data: JSON.stringify(mov),
                                    headers: {
                                        'Authorization': localStorage.getItem("token")
                                    },
                                    contentType: "application/json",
                                    success: function (data) {
                                        console.log("This is the data : " + data);
                                        console.log('success');
                                        location.reload();
                                    }, fail: function (data) {
                                        alert(data);
                                    }

                                });
                            });
                            $("#"+movie.imdbID+"5").on('click', function () {

                                var movieTitle = movie.Title;

                                var marating =$("#myrating"+movie.imdbID).val();
                                alert(marating+movieTitle);
                                var data = {
                                    title: movieTitle,
                                    rating:marating
                                };
                                console.log("Edited MOVIE TITLE :" + movieTitle);
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:3000/api/ratings',
                                    data: JSON.stringify(data),
                                    headers: {
                                        'Authorization': localStorage.getItem("token")
                                    },
                                    contentType: "application/json",
                                    success: function (data) {
                                        console.log("This is the data : " + data);
                                        console.log('success');
                                        location.reload();
                                    }, fail: function (data) {
                                        alert(data);
                                    }

                                });
                            })
                        },done:function (data) {
                            if (data.status(401)){
                                alert('you have to be logged in ')
                            }
                        }
                    });


                });
            },
            fail: function (data) {
                $('#ratingsdata').append('<div  class="col-sm-4"> <div class="thumbnail" ><div class="caption"> <h5 id="title"> your session has expired please log in again</h5> </div> </div> </div>')
            },
            complete: function (data) {

            }

        });

    }


    $.ajax( {
        type: 'GET',
        url: 'http://localhost:3000/api/users',
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        contentType: "application/json",
        success: function (data) {
            console.log("This is the data : " + data);
            console.log('success');
            $('#movie-detail-data').fadeOut(100);

            $.each(data, function (i, user) {

                $('#userdata').append('<div   class="col-sm-4"> <d  iv class="thumbnail" ><div id="'+user.username+i+'" class="caption"> <a id="titlemovie">' + user.firstname + " " + user.lastname + '</a> </div> </div> </div>');
                $("#"+user.username+i).on('click',function (){

                    $('#userdata2').fadeIn(100);
                    $('#userdata').fadeOut(100);
                    $('#userdata2').append('<div  class="col-sm-4"> <div class="thumbnail" ><div class="caption"> <h5 > firstname: '+user.firstname+'</h5><h5 > middlename: '+user.middlename+'</h5><h5 > lastname: '+user.lastname+'</h5><h5 > username: '+user.username+'</h5> </div> </div> </div>');



                });

            });
        },
        complete: function (data) {

        }

    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/movies',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('success');
            var movie = {};
            localStorage.removeItem("movietitle");

            movie = JSON.stringify(data);

            $.each(data, function (i, movie) {

                var movieObject = JSON.stringify(movie);

                console.log(movieObject);
                var image = "";

                $.ajax({
                    type: 'GET',
                    url: 'http://www.omdbapi.com/?i=tt' + movie.tt,
                    success: function (movie) {
                        console.log('success');


                        $('.movies_list').append('<div id="onemovie" class="col-sm-4"> <div class="thumbnail" id ="movie-thumbnail"> <img id="onemoviepic" src=' + movie.Poster + '> <div class="caption"><div id="' + movie.imdbID + '"> <a><h5>' + movie.Title + '</h5></a></div></div> </div> </div>');

                        $("#" + movie.imdbID).on('click', function () {
                            $('.movies_list').remove();

                            $.ajax({
                                type: 'GET',
                                url: 'http://www.omdbapi.com/?t=' + movie.Title,
                                success: function (movie) {

                                    console.log('success');
                                    console.log(movie);
                                    console.log("This is the movie title :" + movie.Title);


                                    $('#one-movie-detail').append('<div  class="col-sm-4"> <div class="thumbnail" id ="movie-thumbnail"> <img id="onemoviepic" src=' + movie.Poster + '> <div class="caption"> <h5>' + movie.Title + '</h5></div></div> </div> <div  class="col-sm-4"> <div class="thumbnail" >  <h4>' + "Director: " + movie.Director + '</h4><h4>' + "Year: " + movie.Year + '</h4><h4>' + "Plot: </h4><h5>" + movie.Plot + '</h4><h4>' + "Genre(s): </h4><h5>" + movie.Genre + '</h4><h4>' + "Langauge(s) : </h4><h5>" + movie.Language + '</h4><h4>' + "IMDB rating: </h4><h5>" + movie.imdbRating + '</h4><h4>' + "Actors: </h4><h5>" + movie.Actors + '</h4><h4>' + "Awards : </h4><h5>" + movie.Awards + '</h4><h4>' + "Run time: </h4><h5>" + movie.Runtime + '</h4></div> </div> <div id="padding-rating-detail" class="container text-center"> <div class="dropdown"> <select class="form-control" id="myrating0"> <option value="1">1</option> <option value="1.5 ">1.5</option> <option value="2">2</option> <option value="2.5">2.5</option> <option value="3">3</option> <option value="3.5">3.5</option> <option value="4">4</option> <option value="4.5">4.5</option> <option value="5">5</option> </select> </br> </br> </div> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Add Rating ! </button>    </div>');
                                    $('#movie-detail-data').fadeOut(100);
                                    localStorage.setItem("movie", movie.Title);
                                    $('#dropdownMenu2').click(function () {
                                        var movieTitle = localStorage.getItem("movie");
                                        console.log(movieTitle);
                                        var rating = $('#myrating0').val();
                                        data = {
                                            title: movieTitle,
                                            rating: rating
                                        };
                                        $.ajax({
                                            type: 'POST',
                                            url: 'http://localhost:3000/api/ratings',
                                            data: JSON.stringify(data),
                                            headers: {
                                                'Authorization': localStorage.getItem("token")
                                            },
                                            contentType: "application/json",
                                            success: function (data) {
                                                console.log("This is the data : " + data);
                                                console.log('success');

                                            }, fail: function (data) {
                                                alert(data);
                                            },
                                            complete: function (data) {

                                            }

                                        });
                                    });

                                }, done: function () {

                                }


                            });


                        });


                    }
                });


            });


        }
    });


    $('#login-form-link').click(function (e) {
        if (localStorage.getItem("token") != "") {
            localStorage.removeItem("token");
            $('#login-submit').fadeIn(100);
            $('#startrating').fadeIn(100);
            $('#startrate').fadeIn(100);
            $('#raterelated').fadeOut(100);
            $('#navbarafterlogged').fadeOut(100);
            $('#forrating').fadeout(100);

        } else {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        }


    });
    $("#login").click(function(){
       localStorage.setItem("token","");
    });

    $("#login-submit").click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var data = {
            username: username,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/login',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                $('#suc').remove();
                console.log('success');
                JSON.stringify(data);
                if (data.length > 60) {

                    $('#msg').append('<div id="suc" class="container text-left"><p>You have logged in successfully</p></div>');

                    localStorage.setItem("token", data);
                    $('#startrate').fadeOut(100);
                    $('#raterelated').fadeIn(100);
                    $('#navbarafterlogged').fadeIn(100);
                    $('#forrating').fadeIn(100);
                    location.reload();



                } else {
                    $('#msg').append('<div id="suc" class="container text-left"><p>' + data + '</p></div>');

                }
                $("#login-form").fadeOut(100);
                $('#login-form-link').removeClass('active');
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');


            },
            fail: function () {
                console.log("failed")
            }

        });

    });

    $('#register-form-link').click(function (e) {
        $('#suc').remove();

        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});
$('#add-rate-button').click(function (e) {
    var rating = $('#ratinglist').val();
    var title = $('#titlemovie').val();

    var data = {
        title: title,
        rating: rating
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/ratings',
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        data: data,
        success: function (data) {
            console.log('success');
        },
        fail: function (err) {
            console.log("failed");

        },
        complete: function (data) {
            alert(data);
        }

    });

});

$("#register-submit").click(function () {
    $('#suc').remove();

        var firstname = $('#firstname').val();
        var middlename = $('#middlename').val();
        var lastname = $('#lastname').val();
        var username = $('#username2').val();
        var password = $('#password2').val();
        var password2 = $('#password3').val();
        var data = {
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            username: username,
            password: password

        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/users',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                console.log('success');
                $('#msg').text(data);
            },
            fail: function (err) {
                console.log("failed");
                $('#msg').text(err);

            }

        });


    });

