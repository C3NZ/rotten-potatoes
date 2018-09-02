const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");

router.post("/", (req, res) => {
	Comment.create(req.body)
		.then(comment => {
			res.redirect(`/reviews/${comment.reviewId}`);
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;
