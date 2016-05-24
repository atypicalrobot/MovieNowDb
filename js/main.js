var source   = $('#entry-template').html();  // load the template from index.html
var template = Handlebars.compile(source);   // compile the template in js
var api_key = "0bc1e253597b90a61225cfa0988842d9"  // store api key as a variable
var genres = []  // 

function displayMovies(movies, callerfunc){  // create function to display movies using above compiled template,
    for(var i = 0; i < movies.length; i++) {  // for each movie in movies array

        var context = movies[i]  // set context for template to current movie
        context.callerfunc = callerfunc; // callerfunc is set to a string representing the calling function e.g.latest
        context.genre_names = [];

        // for genre_id in genre_ids lookup genre id and display name
        for(var j = 0; j < context.genre_ids.length; j++){
            console.log(j + ' ' + genres[context.genre_ids[j]].name);
            context.genre_names[j] = genres[context.genre_ids[j]].name;
        }

        var html    = template(context);  // generate html by passing context to the compiled template
        document.getElementById("mainBody").innerHTML += html;  // add the generated html to the page
    }
    console.log(context);  // display JSON in console
}

$(document).ready(function() {  // wait for all DOM elements to load
    getGenres();  // load genres
});

function getGenres() {  // function that displays genres of the movies
    $.getJSON("http://api.themoviedb.org/3/genre/movie/list?api_key=" + api_key, function(json) {  // make the API request
        console.log(json.genres)  // display the genres in console as 
        genres = {}
        for(i = 0; i < json.genres.length; i++){
            genres[json.genres[i].id] = json.genres[i];
        }
        console.log(genres); // display genres in console
    });
    getLatest(); // load latest films
}

function getLatest() {  // handles fetching movies from the now playing API endpoints
    document.getElementById("mainBody").innerHTML = "<h2> Now Playing </h2>";  // initial html for latest page
    $.getJSON("http://api.themoviedb.org/3/movie/now_playing?api_key=" + api_key, function(json) {  // make the API request
        displayMovies(json.results, "latest");  // use display function to display results 
    });
}
function Popular(){
    document.getElementById("mainBody").innerHTML = "<h2> Popular Films</h2>";
    $.getJSON("http://api.themoviedb.org/3/movie/popular?api_key=" + api_key, function(json) {
        displayMovies(json.results, "popular");
    });
}

function Upcoming(){
    document.getElementById("mainBody").innerHTML = "<h2> Upcoming Films</h2>";
    $.getJSON("http://api.themoviedb.org/3/movie/upcoming?api_key=" + api_key, function(json) {
        displayMovies(json.results, "upcoming");
    });
}

function searchMovies() {  // create function to search movies
    document.getElementById("mainBody").innerHTML = "<h2> Search results </h2>"; // initial html for search results page
    var search = document.getElementById("search").value;  // store seach query as a variable
    $.getJSON("https://api.themoviedb.org/3/search/movie?query=" + search + "&api_key=" + api_key, function(json) {  // make the API request
        displayMovies(json.results, "query");  // use display function to display results
    });
}
