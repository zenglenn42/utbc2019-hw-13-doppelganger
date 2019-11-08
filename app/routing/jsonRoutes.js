var friends = require("../data/friends")

module.exports = function(app) {
    app.get("/friends.json", (req, res) => {
        res.json(JSON.stringify(friends));
    });

    app.post("/submitSurvey.json", (req, res) => {
        // {   name: 'Ahmed',
        //    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg',
        //    scores: [ '5', '1', '4', '4', '5', '1', '2', '5', '4', '1' ] 
        //}

        // DEBUG
        console.log("incoming request = req.body ", req.body);

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
            console.log("Error: Unable to find a doppelganger.");
            console.log(e)
            res.json({})
        }
    });
    
    function findFriend(you, friends) {
        if (!you) {
            throw new Error("findFriend(): undefined 'you' parameter")
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
            if (friendIndex < 0) throw new Error("findFriend(): no friend found")
            return friendIndex
        } else {
            throw new Error("findFriend(): empty friends database");
        }
    }
    
    function vectorDiff(v1, v2) {
        if (v1.length !== v2.length) {
            throw new Error("vectorDiff(): vector length mismatch");
        }
    
        let sigma = 0;
        for (let i = 0; i < v1.length; i++) {
            sigma += Math.pow(v1[i] - v2[i], 2);
        }
        return Math.sqrt(sigma);
    }
}