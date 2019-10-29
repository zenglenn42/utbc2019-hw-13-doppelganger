var express = require("express");
var path = require("path");
var survey = require("./app/data/survey.js")

var app = express();
var homeHtml = "./app/public/home.html"
var PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, homeHtml));
})

app.get("/survey.json", (req, res) => {
    res.json(survey);
});

app.get("*", (req, res) => {
    res.redirect("/");
})

app.listen(PORT, () => {
    console.log(`Friend Finder server listening on port ${PORT}`);
})