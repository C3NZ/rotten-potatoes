//Router for creating & deleting comments
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

router.delete("/:id", (req, res) => {
	console.log("DELETE comment");
	Comment.findByIdAndRemove(req.params.id)
		.then(comment => {
			res.redirect(`/reviews/${comment.reviewId}`);
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;
