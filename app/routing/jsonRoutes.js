const { getAppSurveyRespondents } = require("../data/similarityEngineObj.js")

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
            newRespondent = req.body;
            let lang = newRespondent.lang;
            let app = newRespondent.app;
            let surveyRespondents = getAppSurveyRespondents(app, lang);
            let sortedResults = sortBySimilarity(newRespondent, surveyRespondents, "DESCENDING").map((result) => {
                let index = result.index;
                return {
                    "name": surveyRespondents[index].name,
                    "photo": surveyRespondents[index].photo,
                    "percentSimilar": result.percentSimilar
                }
            });
            console.log("sortedResults = ", sortedResults);
            let jsobj = {
                results: sortedResults
            }
            res.json(jsobj);

            // TODO: Prevent duplicates.
            // if (addToRespondents) surveyRespondents.push(req.body)
        } catch(e) {
            console.log("Error: Unable to find a good match.");
            console.log(e)
            res.json({})
        }
    });
}

function sortBySimilarity(you, surveyRespondents, direction = "ASCENDING") {
    if (!you) {
        throw new Error("sortBySimilarity(): undefined 'you' parameter")
    }

    if (!surveyRespondents || !surveyRespondents.length) {
        throw new Error("sortBySimilarity(): empty respondends database");
    }

    let l2MaxDistance = getl2MaxDistance(you.scores.length);
    let pSimilar = surveyRespondents.map((respondent, i) => {
        let l2 = euclidianDistance(you.scores, respondent.scores);
        let results  = {
            index: i,
            percentSimilar: (1.0 - l2 / l2MaxDistance) * 100
        }
        return results
    });

    if (direction === "ASCENDING") { 
        pSimilar.sort( (a,b) => a.percentSimilar - b.percentSimilar );
    } else {
        pSimilar.sort( (a,b) => b.percentSimilar - a.percentSimilar );
    }
    return pSimilar;
}   

function getl2MaxDistance(numQuestions) {
    let minScores = [];
    let maxScores = [];
    for (let i = 0; i < numQuestions; i++) {
        minScores.push('1');    // TODO: Derive
        maxScores.push('5');    // TODO: Derive
    }
    let maxDistance = euclidianDistance(minScores, maxScores);
    return maxDistance;
}

function cosine(s1, s2, normalize = normalizeVector) {
    let v = normalize(s1);
    let w = normalize(s2);
    let normV = norm(v);
    let normW = norm(w);
    if (normV == 0) throw new Error("cosine: division by 0-vector");
    if (normW == 0) throw new Error("cosine: division by 0-vector");
    return dotProduct(v, w) / (normV * normW)
}

function euclidianDistance(s1, s2, normalize = zeroMedian) {
    if (s1.length !== s2.length) {
        throw new Error("euclidianDistance(): score array length mismatch");
    }
    let sigma = 0;
    let v1 = normalize(s1);
    let v2 = normalize(s2);
    for (let i = 0; i < s1.length; i++) {
        sigma += Math.pow(v1[i] - v2[i], 2);
    }
    return Math.sqrt(sigma);
}

function normalizeVector(v) {
    return v.map((coord) => {
        let iCoord = parseInt(coord);
        if (isNaN(iCoord)) {
            throw new Error(`normalizeVector: vector coord (${coord}) is non-numeric`);
        }
        return iCoord;
    })
}

function mostAndLeastSimilar(you, surveyRespondents) {
    if (!you) {
        throw new Error("mostAndLeastSimilar(): undefined 'you' parameter")
    }

    if (surveyRespondents.length > 0) {
        acc = {
            indexL2MaxSimilar: -1,
            indexL2MinSimilar: -1,
            percentL2MaxSimilar: 0,
            percentL2MinSimilar: 100,
            l2Min: Infinity,
            l2Max: 0,
            l2Distances: [],
            percentL2Similarities: []
        }
        acc = surveyRespondents.reduce((acc, respondent, index) => {
            // Find distance between the tips of two vectors.
            let l2 = euclidianDistance(you.scores, respondent.scores);
            acc.l2Distances.push(l2);
            if (l2 < acc.l2Min) {
                acc.l2Min = l2;
                acc.indexL2MaxSimilar = index;
            }
            if (l2 > acc.l2Max) {
                acc.l2Max = l2;
                acc.indexL2MinSimilar = index;
            }
            return acc;
        }, acc);

        let minScores = [];
        let maxScores = [];
        you.scores.map( () => {
            minScores.push('1');    // TODO: Derive
            maxScores.push('5');    // TODO: Derive
        });
        let l2MaxDistance = euclidianDistance(minScores, maxScores);

        for (let i = 0; i < acc.l2Distances.length; i++) {
            let percentL2Similar = (1.0 - acc.l2Distances[i]/l2MaxDistance) * 100;
            acc.percentL2Similarities.push(percentL2Similar);
            if (percentL2Similar > acc.percentL2MaxSimilar) {
                acc.percentL2MaxSimilar = percentL2Similar;
                acc.indexL2MaxSimilar = i;
            }
            if (percentL2Similar < acc.percentL2MinSimilar) {
                acc.percentL2MinSimilar = percentL2Similar;
                acc.indexL2MinSimilar = i;
            }
        }

        if (acc.indexL2MaxSimilar < 0) throw new Error("mostAndLeastSimilar(): no similar match found")

        console.log("acc.percentL2Similarities =", acc.percentL2Similarities);
        console.log("acc.indexL2MaxSimilar =", acc.indexL2MaxSimilar);
        console.log("acc.indexL2MinSimilar =", acc.indexL2MinSimilar);
        return [
            acc.indexL2MaxSimilar,
            acc.percentL2MaxSimilar,
            acc.indexL2MinSimilar,
            acc.percentL2MinSimilar
        ];
    } else {
        throw new Error("mostAndLeastSimilar(): empty respondends database");
    }
}

function cosine(s1, s2, normalize = normalizeVector) {
    let v = normalize(s1);
    let w = normalize(s2);
    let normV = norm(v);
    let normW = norm(w);
    if (normV == 0) throw new Error("cosine: division by 0-vector");
    if (normW == 0) throw new Error("cosine: division by 0-vector");
    return dotProduct(v, w) / (normV * normW)
}

function euclidianDistance(s1, s2, normalize = zeroMedian) {
    if (s1.length !== s2.length) {
        throw new Error("euclidianDistance(): score array length mismatch");
    }
    let sigma = 0;
    let v1 = normalize(s1);
    let v2 = normalize(s2);
    for (let i = 0; i < s1.length; i++) {
        sigma += Math.pow(v1[i] - v2[i], 2);
    }
    return Math.sqrt(sigma);
}

function normalizeVector(v) {
    return v.map((coord) => {
        let iCoord = parseInt(coord);
        if (isNaN(iCoord)) {
            throw new Error(`normalizeVector: vector coord (${coord}) is non-numeric`);
        }
        return iCoord;
    })
}

// The following transforms survey response values
//
//  from:     1 through 5
//  to:      -2 through 2
//
// This ensures opposing sentiment is modeled by opposing
// vector direction:
//                     -2     0      2
//   strongly disagree <--+-- * --+--> strongly agree
//
// That should yield a better spread of overall resultant vector
// distances.

const BIAS_LEFT = 3;
function zeroMedian(v, bias = BIAS_LEFT) {
    return v.map((coord) => {
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
    n = v.map(coord => Math.pow(coord, 2))
            .reduce(
                (n, sqrdCoord, index) => {
                    n += sqrdCoord
                    return (index == v.length - 1) ? Math.sqrt(n) : n
                }, 
                n);
    return n;
}