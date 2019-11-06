var express = require("express");
var path = require("path");
var friends = require("./app/data/friends")
const surveyHtml = require("./app/data/survey")

var app = express();
var PORT = process.env.PORT || 8080;

// Configure server for incoming posted json in req.body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
})

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "./app/public/style.css"));
});

app.get("/survey.html", (req, res) => {
    res.send(surveyHtml);
});

app.get("*", (req, res) => {
    res.redirect("/");
})

app.post("/submitSurvey.json", (req, res) => {
    // {   name: 'Ahmed',
    //    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg',
    //    scores: [ '5', '1', '4', '4', '5', '1', '2', '5', '4', '1' ] 
    //}
    console.log("request = req.body ", req.body);
    try {
        let i = findFriend(req.body, friends);
        let friend = {
            "name": friends[i].name,
            "photo": friends[i].photo
        }
        // TODO: Prevent duplicates.
        friends.push(req.body)
        res.json(friend)
    } catch(e) {
        console.log("Error: findFriend failure");
        console.log(e)
        res.json({})
    }
});

app.listen(PORT, () => {
    console.log(`Friend Finder server listening on port ${PORT}`);
})

function findFriend(you, friends) {
    if (!you) {
        throw new Error("Empty 'you' object in findFriend()")
    }
    if (friends.length > 0) {
        let closestSoFar = Infinity;
        let friendIndex = -1;
        
        friendIndex = friends.reduce((acc, friend, index) => {
            let distance = vectorDiff(you.scores, friend.scores);
            if (distance < closestSoFar) {
                closestSoFar = distance;
                acc = index;
            }
            return acc;
        }, friendIndex);
        if (friendIndex < 0) throw new Error("No friend found")
        return friendIndex
    } else {
        throw new Error("Empty friends database");
    }
}

function vectorDiff(v1, v2) {
    if (v1.length !== v2.length) {
        throw new Error("vectorDifference: vector length mismatch");
    }

    let sigma = 0;
    for (let i = 0; i < v1.length; i++) {
        sigma += Math.pow(v1[i] - v2[i], 2);
    }
    return Math.sqrt(sigma);
}