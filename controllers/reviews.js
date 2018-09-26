//Router for interacting with the reviews endpoint
//The endpoint is /movies/:movieId/reviews

const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../models/review");
const Comment = require("../models/comment");

//Return the form for creating a new review
router.get('/new', (req, res) => {
	res.render("reviews-new", { movieId: req.params.movieId});
}); 

//Create a new review
router.post("/", (req, res) => { 
	Review.create(req.body).then(review => {
		res.redirect(`/movies/${review.movieId}`);
	}).catch(err => {
		console.log(err);
	});
});

//Return a specific review
router.get("/:id", (req, res) => {
	Review.findById(req.params.id).then(review => {
		Comment.find({reviewId: review._id}).then(comments => {
			res.render("reviews-show", { review:review, comments:comments });
		});		
	}).catch(err => {
		console.log(err);
	});
});

//update a specific review and send the user back to the reivew
router.put("/:id", (req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body).then(review =>{
		res.redirect(`/movies/${review.movieId}/reviews/${review.id}`);
	}).catch(err => {
		console.log(err.message);
	});
});

//Delete a specific review and send the user back to the movie page.
router.delete("/:id", (req, res) => {
	Review.findByIdAndRemove(req.params.id).then(review => {
		res.redirect(`/movies/${review.movieId}`);
	}).catch(err => {
		console.log(err.message);
	});
});

//Get the edit form for the review
router.get("/:id/edit", (req, res) => {
	Review.findById(req.params.id, function(err, review){ 
		res.render("reviews-edit", { review : review });
	});
});

module.exports = router;
