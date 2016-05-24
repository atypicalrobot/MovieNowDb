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