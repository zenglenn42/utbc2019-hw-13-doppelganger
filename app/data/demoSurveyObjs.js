const { getObjFriendFinder } = require("./friendFinderObj.js")

const getDemoTitles = function(lang) {
    return [ getObjFriendFinder(lang).title ];
}

module.exports = getDemoTitles;