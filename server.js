var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Welcome to Friend Finder</h1>");
})

app.listen(PORT, () => {
    console.log(`Friend Finder server listening on port ${PORT}`);
})