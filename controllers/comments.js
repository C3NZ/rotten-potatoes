//Router for creating & deleting comments
const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");
const Review = require("../models/review");

router.post("/", (req, res) => {
	console.log(req.body)
	Comment.create(req.body).then(comment => {
			res.status(200).send({ comment: comment})
		})
		.catch(err => {
			res.status(400).send({err:err});
		});
});

router.delete("/:id", (req, res) => {
	console.log("DELETE comment");
	Comment.findByIdAndRemove(req.params.id).then(comment => {
		res.status(200).send({comment : comment})
	}).catch(err => {
		console.log(err);
		res.status(404).send(err);
	});
});

module.exports = router;
