var express = require("express");
var survey = require("./app/data/survey.js")
var app = express();
var PORT = process.env.PORT || 8080;

console.log(survey);

app.get("/", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Welcome to Friend Finder</h1>");
})

app.get("/survey.json", (req, res) => {
    res.json(survey);
});

app.listen(PORT, () => {
    console.log(`Friend Finder server listening on port ${PORT}`);
})