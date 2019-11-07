const surveyHtml = require("../data/survey")
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
    
    app.get("/survey.html", (req, res) => {
        res.send(surveyHtml);
    });
    
    app.get("*", (req, res) => {
        res.redirect("/");
    })
}