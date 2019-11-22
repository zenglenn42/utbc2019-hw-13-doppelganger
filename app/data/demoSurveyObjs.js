const DEFAULT_LANG = "en"
const { 
    getObjFriendFinder,
    getFriendFinderImg
} = require("./friendFinderObj.js")

const { 
    getObjDanceFinder,
    getDanceFinderImg
 } = require("./danceFinderObj.js")

const demoObj = {
    FriendFinder: getObjFriendFinder,
    DanceFinder: getObjDanceFinder
}

const getDemoTitles = function(lang) {
    return [ 
        getObjFriendFinder(lang).title,
        getObjDanceFinder(lang).title  
    ];
}

const getDemoTitleKeys = function() {
    return [ 
        getObjFriendFinder("en").title,
        getObjDanceFinder("en").title  
    ];
}

const getDemoObj = function(app, lang = DEFAULT_LANG) {
    // console.log("app = ", app);
    // console.log("demoObj[app] = ", demoObj[app]);
    return demoObj[app](lang);
}

const getDemoImg = function(app, lang = DEFAULT) {
    return demoObj[app](lang).backgroundImgFile
}

module.exports = {
    getDemoTitles,
    getDemoTitleKeys,
    getDemoObj,
    getDemoImg
}
