const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/rotten-potatoes", {useNewUrlParser: true});

const Review = mongoose.model("Review", {
	title: String
});

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

//let reviews = [
//	{title: "Inception"},
//	{title: "Interstellar"}
//];

app.get("/", (req, res) => {
	Review.find()
		.then(reviews => {
			res.render("reviews-index", {reviews: reviews});
		})
		.catch(err => {
			console.log(err);
		})
	});

app.listen(3000, () => {
	console.log("App listening on port 3000");
});

