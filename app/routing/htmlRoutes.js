const path = require("path");
const { getObj, getLangObj } = require("../data/similarityEngineObj.js")

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/similarityEngineSkeleton.html"));
    })

    app.get("/similarityEngine.css", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/similarityEngine.css"));
    });

    app.get("/similarityEngineController.js", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/similarityEngineController.js"));
    });

    app.get("/similarityEngineLogo.png", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/similarityEngineLogo.png"));
    });

    app.get("/similarityEngineBackground.jpg", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/similarityEngineBackground.jpg"));
    });

    app.get("/i18nLogo.png", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/i18nLogo.png"));
    });

    app.get("/similarityEngineBody.html", (req, res) => {
        let lang = req.query.lang;
        res.send(getSimilarityEngineBodyHtml(lang, getObj()));
    });
}

function getSimilarityEngineBodyHtml(lang, jsObj) {
    jsLangObj = getLangObj(lang);
    demoSurveys = jsObj.demoSurveys;

    let demoSurveyOptions = demoSurveys.map((survey, index) => {
        let minifiedSurvey = survey.replace(/[ ]*/g,"");
        return `<option value="${minifiedSurvey}">${survey}</option>`
    });
    let demoSelectHtml = `
        <select name="survey" id="select-survey">
            <option value="">${jsLangObj.optionText}</option>
            ${demoSurveyOptions}
        </select>
        `
    const bodyHtml = `
        <span id="title" style="display: none">${jsLangObj.title}</span>
        <header>
            <h1>${jsLangObj.title}</h1>
        </header>
        <main>
            <h2 id="main-cta-short">${jsLangObj.callToActionShort}</h2>
            <p id="main-cta-long">${jsLangObj.callToActionLong}</p>
            <div id="main-select-survey">
                <h2>${jsLangObj.selectDemoText}</h2>
                ${demoSelectHtml}
            </div>
        </main>
        <footer>
            <p>Copyright &copy; 2019 zenglenn42</p>
        </footer>
    `
    return bodyHtml
}

function getHomeBodyHtml(jsObj) {
    const homeBodyHtml = `
        <span id="title" style="display: none">${jsObj.title}</span>
        <span id="similar" style="display: none">${jsObj.similarText}</span>
        <span id="similarResults" style="display: none">${jsObj.similarResults}</span>
        <span id="dissimilarResults" style="display: none">${jsObj.dissimilarResults}</span>
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
            <h3><strong>${jsObj.questionText} ${num}</strong></h3>
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