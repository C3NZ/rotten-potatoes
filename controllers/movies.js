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
							console.log(`Genre Id: ${genreId}`);
							console.log(`movieGenres ${movieGenres}`);
							if (movieGenres.includes(genreId)){
								return options.fn(this);
							}else{
								return options.inverse(this);
							}
						}
					}
				});
			//	console.log(movies.results)
			//	console.log(genres.genres)
		});
	});
});

module.exports = router;
