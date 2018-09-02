const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/rotten-potatoes", {useNewUrlParser: true});

const Review = mongoose.model("Review", {
	title: String,
	movieTitle: String,
	review: String,
	rating: Number
});

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
		});
	});

app.get("/reviews/new", (req, res) => {
	res.render("reviews-new", {});
});

app.get("/reviews/:id", (req, res) => {
	Review.findById(req.params.id)
		.then(review => {
			res.render("reviews-show", { review: review });
		})
		.catch(err => {
			console.log(err);
		});
});

app.post("/reviews", (req, res) => {
	Review.create(req.body)
		.then(review => {
			res.redirect(`/reviews/${review._id}`);
		})
		.catch(err => {
			console.log(err.message)
		});
});

app.get("/reviews/:id/edit", (req, res) => {
	Review.findById(req.params.id, function(err, review){ 
		res.render("reviews-edit", { review : review });
	});
});

app.put("/reviews/:id", (req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body)
		.then(review =>{
			res.redirect(`/reviews/${review.id}`);
		})
		.catch(err => {
			console.log(err.message);
		});
});
app.listen(3000, () => {
	console.log("App listening on port 3000");
});

