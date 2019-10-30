# utbc2019-hw-13-friendfinder

Find someone with similar interests.

![alt](docs/img/helena-lopes-PGnqT0rXWLs-unsplash.jpg)

## Technology stack

* Frontend
  * Material Design UI

* Backend
  * Node.js
  * Express.js

## Server-side cheet sheet ;-)

Refresh your brain [here](docs/notes.md).

## Add some data

To keep things simple, our friends 'database' will just be a chunk of json sitting on the server:

  [app/data/friends.js](app/data/friends.js)

and our survey will also start out as server-side json:

  [app/data/survey.js](app/data/survey.js)

## Add a simple express server and a route to serve up our survey json

```
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
```
![alt](docs/img/survey_json.png)

## Add a route for sending down our home page html

```
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
```

## Add ability to POST test survey from client to server

client
```
<body>
    <h1>Welcome to Friend Finder</h1>
    <p>Answer a few basic questions</p>
    <p>Then find someone who answered similarly.</p>
    <button><a href="/survey.json">Go to Survey</a></button>
    <button id="post-data">Post Test JSON</button>
</body>

<script>
    var button = document.getElementById("post-data");
    console.log("button", button);
    button.addEventListener("click", postData);

    function postData(e) {
        console.log("clicked event = ", e);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/incomingSurvey.json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var userInfo = JSON.parse(xhr.responseText);
                console.log(userInfo);
            }
        }
        xhr.send(JSON.stringify(
            {
                "name": "Ahmed",
                "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
                "scores": [
                    "5",
                    "1",
                    "4",
                    "4",
                    "5",
                    "1",
                    "2",
                    "5",
                    "4",
                    "1"
                ]
	        },
        ));
    };
</script>
```

server
```
var express = require("express");
var path = require("path");
var survey = require("./app/data/survey.js")

var app = express();
var homeHtml = "./app/public/home.html"
var PORT = process.env.PORT || 8080;

// Configure server for incoming posted json in req.body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, homeHtml));
})

app.get("/survey.json", (req, res) => {
    res.json(survey);
});

app.get("*", (req, res) => {
    res.redirect("/");
})

app.post("/incomingSurvey.json", (req, res) => {
    console.log("request = req.body ", req.body);
});

app.listen(PORT, () => {
    console.log(`Friend Finder server listening on port ${PORT}`);
})
```
