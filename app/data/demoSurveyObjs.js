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

const getDemoSurveyRespondents = function(app, lang = DEFAULT_LANG) {
    console.log(demoObj[app]);
    console.log(demoObj[app](lang));
    return demoObj[app](lang).respondents
}

const getDemoSurveyHtml = function(app, lang) {
    const jsObj = getDemoObj(app, lang).survey;
    const minComment = jsObj.minComment;
    const maxComment = jsObj.maxComment
    const questionsHtml = jsObj.questions.map((question, index) => {
        let num = index + 1;
        let questionHtml = `
            <h3><strong>${jsObj.questionText} ${num}</strong></h3>
            <p class="chosen-select">${question}</p>
            <select name="q${num}" class="chosen-select" id="q${num}" required>
                <option value=""></option>
                <option value="1">1 (${minComment})</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (${maxComment})</option>
            </select>
            `
        return questionHtml
    }).join("");
    let namePhotoHtml = "";
    switch (app) {
        case "FriendFinder":
            namePhotoHtml = `
                <label><h4>${jsObj.nameLabel}</h4><input name="name" type="text" placeholder="${jsObj.namePlaceholder}" required></input></label>
                <label><h4>${jsObj.photoLabel}</h4><input name="photo" type="text" placeholder="${jsObj.photoPlaceholder}" required></input></label>
            `
            break;
    }
    const surveyHtml = `
        <div id="survey-container">
            <h2>${jsObj.surveyTitle}</h2>
            <hr>
            <form id="surveyForm">
                <legend><h3><strong>${jsObj.formHeading}</strong></legend>
                ${namePhotoHtml}
                <hr>
                ${questionsHtml}
                <p>
                    <input type="submit" value="${jsObj.submitText}">
                    <input type="reset" value="${jsObj.resetText}">
                    <input type="button" value="${jsObj.apiText}" id="api-button">
                </p>
            </form>
            <div class="modal" style="display: none;">
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <div id="results">
                    </div>
                </div>
            </div>
        </div>
        `
    return surveyHtml
}

module.exports = {
    getDemoTitles,
    getDemoTitleKeys,
    getDemoObj,
    getDemoImg,
    getDemoSurveyRespondents,
    getDemoSurveyHtml
}
