var surveyRespondents = require("../data/respondents.js")

module.exports = function(app) {
    app.get("/surveyRespondents.json", (req, res) => {
        res.json(surveyRespondents);
    });

    app.post("/submitSurvey.json", (req, res) => {
        // {   name: 'Ahmed',
        //    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg',
        //    scores: [ '5', '1', '4', '4', '5', '1', '2', '5', '4', '1' ] 
        //}

        // DEBUG
        console.log("incoming request = req.body ", req.body);

        try {
            let [i, percentSimilar] = mostSimilar(req.body, surveyRespondents);
            let results = {
                "name": surveyRespondents[i].name,
                "photo": surveyRespondents[i].photo,
                "percentSimilar": percentSimilar.toFixed(0)
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
            acc = {
                cosIndex: -1,
                cosPercent: 0,
                cosDistances: [],
                l2Index: -1,
                l2Min: Infinity,
                l2Distances: [],
                similarIndex: -1
            }
            acc = surveyRespondents.reduce((acc, respondent, index) => {
                // Cosine distance (between -1 and 1) is our primary indicator of survey
                // sentiment similarity ... the vectors are pointing in the same general
                // direction. 1 is 100% similar, -1 is 0% similar.
                let cos = cosineDistance(you.scores, respondent.scores);
                acc.cosDistances.push(cos);
                let percent = ((cos + 1.0) / 2.0) * 100.0;
                if (percent > acc.cosPercent) {
                    acc.cosPercent = percent;
                    acc.cosIndex = index;
                    acc.similarIndex = index;
                }

                // Euclidian distance is our secondary indicator of similarity.
                // Smaller distance is more similar.
                let l2 = euclidianDistance(you.scores, respondent.scores);
                acc.l2Distances.push(l2);
                if (l2 < acc.l2Min) {
                    acc.l2Min = l2;
                    acc.l2Index = index;
                }
                return acc;
            }, acc);

            let minL2Distance = acc.l2Distances[acc.cosIndex];
            for (let i = 0; i < acc.l2Distances.length; i++) {
                if (acc.cosIndex != i) {
                    if (acc.cosDistances[acc.cosIndex] == acc.cosDistances[i]) {
                        if (acc.l2Distances[i] < minL2Distance) {
                            minL2Distance = acc.l2Distances[i];
                            acc.similarIndex = i;
                        }
                    }
                }
            }

            if (acc.similarIndex < 0) throw new Error("mostSimilar(): no similar match found")
            return [acc.similarIndex, acc.cosPercent]
        } else {
            throw new Error("mostSimilar(): empty respondends database");
        }
    }

    function cosineDistance(s1, s2, normalizeToVector = zeroMedian) {
        let v = normalizeToVector(s1);
        let w = normalizeToVector(s2);
        return dotProduct(v, w) / (norm(v) * norm(w))
    }
    
    function euclidianDistance(s1, s2, normalizeToVector = zeroMedian) {
        if (s1.length !== s2.length) {
            throw new Error("vectorDiff(): score array length mismatch");
        }
        let sigma = 0;
        let v1 = normalizeToVector(s1);
        let v2 = normalizeToVector(s2);
        for (let i = 0; i < s1.length; i++) {
            sigma += Math.pow(v1[i] - v2[i], 2);
        }
        return Math.sqrt(sigma);
    }

    const RAW_MID_VALUE = 3; // TODO: Derive this.
    function zeroMedian(v, bias = RAW_MID_VALUE) {

        // Shift raw scores from:
        //      1 thru 5 
        // to: -2 thru 2
        //
        // This creates a true vector since it can now be a member of a vector space
        // which must contain the null vector (or [0, 0, 0, 0, 0] in this case.

        return v.map(coord => {
            let iCoord = parseInt(coord);
            if (isNaN(iCoord)) {
                throw new Error(`zeroMedian: vector coord (${coord}) is non-numeric`);
            }
            return iCoord - bias;
        })
    }

    function dotProduct(v1, v2) {
        let dp = 0;
        for (i = 0; i < v1.length; i++) {
            let prod = v1[i] * v2[i];
            dp += prod;
        }
        return dp;
    }

    function norm(v) {
        let n = 0;
        n = v.map(coord => Math.pow(coord, 2)).reduce((n, sqrdCoord, index) => {
                        n += sqrdCoord
                        return (index == v.length - 1) ? Math.sqrt(n) : n
                  }, n);
        return n;
    }
}