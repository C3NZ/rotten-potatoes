//index & movies router module


//Express and the router to attach to express
const express = require("express");
const router = express.Router();

//Movie db access
const movieDb = require("moviedb-promise");
const moviedb = new movieDb("c45bddf90209a92e0e385fcae855b53c")

const Reviews = require("../models/review")

//SHOW all movies (index page)
router.get('/', (req, res) => {
	moviedb.miscNowPlayingMovies().then(movies => {
		moviedb.genreMovieList().then(genres => {
			res.render("movies-index", { 
				movies: movies.results,
				genres: genres.genres,
				helpers: {
					//Helper function used to sort movies into genres
					compare: function(genreId, movieGenres, options) {
						if (movieGenres.includes(genreId)){
							return options.fn(this);
						}else{
							return options.inverse(this);
						}
					}
				}
			});
		});
	});
});

//SHOW a specific movie
router.get('/movies/:id', (req, res) => {
	moviedb.movieInfo({id: req.params.id}).then(movie => {
		Reviews.find({movieId: req.params.id}).then(reviews => {
			if(movie.video){
				moviedb.movieVideos({id: req.params.id}).then(videos => {
					movie.trailer_youtube_id = videos.results[0].key
					renderTemplate(movie);
				});
			}else{
				renderTemplate(movie);
			}
			function renderTemplate(movie){
				res.render('movies-show', {movie: movie, reviews: reviews})
			}
		}).catch(err => {console.log(err)});
	}).catch(err => {console.log(err)});
});

module.exports = router;
