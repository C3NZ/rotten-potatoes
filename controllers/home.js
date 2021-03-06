//index router

const express = require("express");
const router = express.Router();

const Review = require("../models/review");

//Old index route`
router.get("/", (req, res) => {
	Review.find()
		.then(reviews => {
			res.render("reviews-index", { reviews:reviews });
		})
		.catch(err => {
			console.log(err.message);
		});
});

module.exports = router;
