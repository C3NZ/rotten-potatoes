//Router for creating & deleting comments
const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");
const Review = require("../models/review");

//Create a new comment
router.post("/", (req, res) => {
	Comment.create(req.body).then(comment => {
			res.status(200).send({ comment: comment})
		})
		.catch(err => {
			res.status(400).send({err:err});
		});
});

//Delete a comment
router.delete("/:id", (req, res) => {
	Comment.findByIdAndRemove(req.params.id).then(comment => {
		res.status(200).send({comment : comment})
	}).catch(err => {
		console.log(err);
		res.status(404).send(err);
	});
});

module.exports = router;
