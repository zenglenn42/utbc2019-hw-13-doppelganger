const path = require("path");
const getHomeBodyObj = require("../data/homeBody.js")
const getSurveyBodyObj = require("../data/surveyBody.js")

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    })

    app.get("/style.css", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/style.css"));
    });

    app.get("/controller.js", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/controller.js"));
    });

    app.get("/homeBody.html", (req, res) => {
        let lang = req.query.lang;
        res.send(getHomeBodyHtml(getHomeBodyObj(lang)));
    });

    app.get("/surveyBody.html", (req, res) => {
        let lang = req.query.lang;
        res.send(getSurveyBodyHtml(getSurveyBodyObj(lang)));
    });
}

function getHomeBodyHtml(jsObj) {
    const homeBodyHtml = `
        <span id="title" style="display: none">${jsObj.title}</span>
        <h1>${jsObj.callToActionShort}</h1>
        <p>${jsObj.callToActionLong}</p>
        <button id="get-survey-html">${jsObj.buttonText}</button>
    `
    return homeBodyHtml
}

function getSurveyBodyHtml(jsObj) {
    const minComment = jsObj.minComment;
    const maxComment = jsObj.maxComment
    const questionsHtml = jsObj.questions.map((question, index) => {
        let num = index + 1;
        let questionHtml = `
            <h3><strong>Question ${num}</strong></h3>
            <h4>${question}</h4>
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
    const surveyHtml = `
        <div id="survey-container">
            <h2>${jsObj.surveyTitle}</h2>
            <hr>
            <form id="surveyForm">
                <legend><h3><strong>${jsObj.formHeading}</strong></legend>
                <label><h4>${jsObj.nameLabel}</h4><input name="name" type="text" placeholder="${jsObj.namePlaceholder}" required></input></label>
                <label><h4>${jsObj.photoLabel}</h4><input name="photo" type="text" placeholder="${jsObj.photoPlaceholder}" required></input></label>
                <hr>
                ${questionsHtml}
                <p>
                    <input type="submit" value="${jsObj.submitText}">
                    <input type="reset" value="${jsObj.resetText}">
                    <input type="button" value="${jsObj.apiText}" id="api-button">
                </p>
            </form>
            <div class="modal">
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