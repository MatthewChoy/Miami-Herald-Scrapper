var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 5000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout:"main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhostMongoHeadlines";

mongoose.connect(db, function(error) {
    if(error) {
        console.log(error);
    } 
    else { console.log("listening to port" + PORT);
    }
});

app.listen(PORT, function() {
    console.log("listening on port" + PORT);
});