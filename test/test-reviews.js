const chai = require("chai");
const chaiHttp =  require("chai-http");
const app = require("../app");
const should = chai.should()
const Review = require("../models/review");

chai.use(chaiHttp);

const sampleReview = {
	"title":"Super sweet review",
	"movieTitle":"This movie is alright",
	"review":"Like I said in the title, it's nothing special"
}

describe("Reviews", () => {
	
	after(() => {
		Review.deleteMany({title:"Super sweet reveiw"}).exec((err, reviews) => {
			console.log(reviews);
			reviews.remove();
		})
	})

	it("Should index all of the reviews on / GET", (done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.html;
				done();
			});
	});

	it("should display a new form on /reviews/new GET", (done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.html;
				done();
			});
	});

	it("should show a single review on /reviews/:id GET", (done) => {
		var review = new Review(sampleReview);
		review.save((err, data) => {
			chai.request(app)
				.get(`/reviews/${data._id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.html;
					done();
				});
		});
	});

	it("should edit a single review on /reviews/:id/edit GET", (done) => {
		var review = new Review(sampleReview);
		review.save((err, data) => {
			chai.request(app)
				.get(`/reviews/${data._id}/edit`)
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.html;
					done();
				});
		});
	});

	it("should create a single review on /reviews POST", (done) => {
		chai.request(app)
			.post('/reviews')
			.send(sampleReview)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.html;
				done();
			});
	});

	it("should update a SINGLE review on /reviews/:id PUT", (done) => {
		var review = new Review(sampleReview);
		review.save((err, data) => {
			chai.request(app)
				.put(`/reviews/${data._id}`)
				.send({'title':'updating the title'})
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.html;
					done();
				});
		});
	});

	it("should delete a single review on /reviews/:id DELETE", (done) => {
		var review = new Review(sampleReview);
		review.save((err, data) => {
			chai.request(app)
				.delete(`/reviews/${data._id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.html;
					done();
				})
		})
	})
}); 
