const surveyBodyHtml = require("../data/surveyBody.js")
const homeBodyHtml = require("../data/homeBody.js")

var path = require("path");

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    })

    app.get("/style.css", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/style.css"));
    });

    app.get("/controller.js", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/controller.js"));
    });

    app.get("/homeBody.html", (req, res) => {
        res.send(homeBodyHtml);
    });

    app.get("/surveyBody.html", (req, res) => {
        res.send(surveyBodyHtml);
    });
}