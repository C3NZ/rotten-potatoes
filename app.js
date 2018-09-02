//express modules & objects
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//Db
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/rotten-potatoes", {useNewUrlParser: true});

//Routers
const reviews = require("./controllers/reviews");

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use('/', reviews);

app.listen(3000, () => {
	console.log("App listening on port 3000");
});

