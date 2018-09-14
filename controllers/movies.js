const express = require("express");
const router = express.Router();

//Movie db access
const movieDb = require("moviedb-promise");
const moviedb = new movieDb("c45bddf90209a92e0e385fcae855b53c")


router.get('/', (req, res) => {
	moviedb.miscNowPlayingMovies().then(response => {
		console.log(response.results)
		res.render("movies-index", {movies: response.results});
	});
});

module.exports = router;
