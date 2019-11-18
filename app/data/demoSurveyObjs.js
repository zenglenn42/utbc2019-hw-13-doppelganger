const { getObjFriendFinder } = require("./friendFinderObj.js")
const { getObjDanceFinder } = require("./danceFinderObj.js")

const getDemoTitles = function(lang) {
    return [ 
        getObjFriendFinder(lang).title,
        getObjDanceFinder(lang).title  
    ];
}

module.exports = getDemoTitles;