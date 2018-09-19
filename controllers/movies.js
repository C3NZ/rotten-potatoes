const express = require("express");
const router = express.Router();

//Movie db access
const movieDb = require("moviedb-promise");
const moviedb = new movieDb("c45bddf90209a92e0e385fcae855b53c")


router.get('/', (req, res) => {
	moviedb.miscNowPlayingMovies().then(movies => {
		moviedb.genreMovieList().then(genres => {
			res.render("movies-index", { 
				movies: movies.results,
				genres: genres.genres,
				helpers: {
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

router.get('/movies/:id', (req, res) => {
	moviedb.movieInfo({id: req.params.id}).then(movie => {
		if(movie.video){
			moviedb.movieVideos({id: req.params.id}).then(videos => {
				movie.trailer_youtube_id = videos.results[0].key
				renderTemplate(movie);
			});
		}else{
			renderTemplate(movie);
		}
		function renderTemplate(movie){
			res.render('movies-show', {movie: movie})
		}
	
	});
});

module.exports = router;
