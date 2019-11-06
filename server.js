var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

// Configure server for incoming posted json in req.body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/htmlRoutes")(app)
require("./app/routing/jsonRoutes")(app)

app.listen(PORT, () => {
    console.log(`Friend Finder server listening on port ${PORT}`);
})