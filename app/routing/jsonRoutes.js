var surveyRespondents = require("../data/friends.js")

module.exports = function(app) {
    app.get("/surveyRespondents.json", (req, res) => {
        res.json(JSON.stringify(surveyRespondents));
    });

    app.post("/submitSurvey.json", (req, res) => {
        // {   name: 'Ahmed',
        //    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg',
        //    scores: [ '5', '1', '4', '4', '5', '1', '2', '5', '4', '1' ] 
        //}

        // DEBUG
        console.log("incoming request = req.body ", req.body);

        try {
            let i = mostSimilar(req.body, surveyRespondents);
            let results = {
                "name": surveyRespondents[i].name,
                "photo": surveyRespondents[i].photo
            }
            // TODO: Prevent duplicates.
            surveyRespondents.push(req.body)
            res.json(results)
        } catch(e) {
            console.log("Error: Unable to find someone similar.");
            console.log(e)
            res.json({})
        }
    });
    
    function mostSimilar(you, surveyRespondents) {
        if (!you) {
            throw new Error("mostSimilar(): undefined 'you' parameter")
        }
        if (surveyRespondents.length > 0) {
            let closestSoFar = Infinity;
            let index = -1;
            
            index = surveyRespondents.reduce((acc, respondent, index) => {
                let distance = vectorDiff(you.scores, respondent.scores);
                if (distance < closestSoFar) {
                    closestSoFar = distance;
                    acc = index;
                }
                return acc;
            }, index);
            if (index < 0) throw new Error("mostSimilar(): no similar match found")
            return index
        } else {
            throw new Error("mostSimilar(): empty respondends database");
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