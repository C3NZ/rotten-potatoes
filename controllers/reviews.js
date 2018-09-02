const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.get("/", (req, res) => {
	Review.find()
		.then(reviews => {
			res.render("reviews-index", { reviews:reviews });
		})
		.catch(err => {
			console.log(err.message);
		});
});

router.get("/reviews/new", (req, res) => {
	res.render("reviews-new", {});
});

router.get("/reviews/:id", (req, res) => {
	Review.findById(req.params.id)
		.then(review => {
			res.render("reviews-show", { review: review });
		})
		.catch(err => {
			console.log(err);
		});
});

router.post("/reviews", (req, res) => {
	Review.create(req.body)
		.then(review => {
			res.redirect(`/reviews/${review._id}`);
		})
		.catch(err => {
			console.log(err.message)
		});
});

router.get("/reviews/:id/edit", (req, res) => {
	Review.findById(req.params.id, function(err, review){ 
		res.render("reviews-edit", { review : review });
	});
});

router.put("/reviews/:id", (req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body)
		.then(review =>{
			res.redirect(`/reviews/${review.id}`);
		})
		.catch(err => {
			console.log(err.message);
		});
});

router.delete("/reviews/:id", (req, res) => {
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
