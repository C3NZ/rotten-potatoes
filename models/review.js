const mongoose = require("mongoose");

module.exports = mongoose.model("Review", {
	title: String,
	movieTitle: String,
	review: String,
	rating: Number
});
