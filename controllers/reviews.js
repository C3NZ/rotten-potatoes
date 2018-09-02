//Router for interacting with the reviews endpoint
const express = require("express");
const router = express.Router();

const Review = require("../models/review");
const Comment = require("../models/comment");

router.get("/new", (req, res) => {
	res.render("reviews-new", {});
});

router.get("/:id", (req, res) => {
	Review.findById(req.params.id)
		.then(review => {
			Comment.find({reviewId: review._id})
				.then(comments => {
					res.render("reviews-show", { review:review, comments:comments });
				});		
		})
		.catch(err => {
			console.log(err);
		});
});

router.post("/", (req, res) => {
	Review.create(req.body)
		.then(review => {
			res.redirect(`/reviews/${review._id}`);
		})
		.catch(err => {
			console.log(err.message)
		});
});

router.get("/:id/edit", (req, res) => {
	Review.findById(req.params.id, function(err, review){ 
		res.render("reviews-edit", { review : review });
	});
});

router.put("/:id", (req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body)
		.then(review =>{
			res.redirect(`/reviews/${review.id}`);
		})
		.catch(err => {
			console.log(err.message);
		});
});

router.delete("/:id", (req, res) => {
	console.log("delete review");
	Review.findByIdAndRemove(req.params.id)
		.then(review => {
			res.redirect('/');
		})
		.catch(err => {
			console.log(err.message);
		});
});

module.exports = router;
