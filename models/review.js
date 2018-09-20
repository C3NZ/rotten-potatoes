const mongoose = require("mongoose");

module.exports = mongoose.model("Review", {
	title: String,
	movieTitle: String,
	movieId: { type: String, required: true},
	review: String,
	rating: Number
});
