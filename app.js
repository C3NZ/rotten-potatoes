//express modules & objects
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//Db
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rotten-potatoes", {useNewUrlParser: true});

//Routers
const reviews = require("./controllers/reviews");
const comments = require("./controllers/comments");

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use('/', reviews);
app.use('/reviews/comments', comments);

app.listen(3000, () => {
	console.log("App listening on port 3000");
});

