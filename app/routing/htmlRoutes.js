const path = require("path");
const { 
    getObj, 
    getLangObj, 
    getLanguageName,
    getSupportedLangCodes,
    getAppObj,
    getAppTitleKeys,
    getAppImg,
    getAppSurveyHtml,
} = require("../data/similarityEngineObj.js")

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/similarityEngineSkeleton.html"));
    })

    app.get("/similarityEngine.css", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/similarityEngine.css"));
    });

    app.get("/surveyModal.css", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/surveyModal.css"));
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

    app.get("/FriendFinderBackground.jpg", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/FriendFinderBackground.jpg"));
    });

    app.get("/DanceFinderBackground.jpg", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/DanceFinderBackground.jpg"));
    });

    app.get("/i18nLogo.png", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/i18nLogo.png"));
    });

    app.get("/similarityEngineBody.html", (req, res) => {
        let lang = req.query.lang;
        //console.log("getting body, server says lang =", lang)
        res.send(getSimilarityEngineBodyHtml(lang, getObj()));
    });

    app.get("/appSkeleton.html", (req, res) => {
        let lang = req.query.lang;
        let app = req.query.app;

        //console.log("get skeleton html for", app);
        let appSkeletonHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Similarity Engine App</title>
                <link rel="stylesheet" type="text/css" href="similarityEngine.css">
                <script type="text/javascript" src="similarityEngineController.js"></script
            </head>
            <body>
                <div id="body-container" app="${app}">
                </div>
            </body>
            <script type="text/javascript">
                document.addEventListener(
                    "DOMContentLoaded",
                    (event) => {
                        controller = new SimilarityEngineController("${lang}", "${app}");
                    }
                );
            </script>
            </html>
            `
        res.send(appSkeletonHtml);
    })

    app.get("/appBody.html", (req, res) => {
        let lang = req.query.lang;
        let app = req.query.app;
        // console.log("getting body: lang =", lang);
        // console.log(`app = >${app}<`)
        res.send(getAppBodyHtml(lang, app, getAppObj(app, lang)));
    });

    app.get("/appMain.html", (req, res) => {
        let lang = req.query.lang;
        let app = req.query.app;
        res.send(getAppMainHtml(app, lang));
    });
}

function getAppMainHtml(app, lang) {
    //const mainHtml = getSurveyHtml(jsLangObj.survey);
    const mainHtml = getAppSurveyHtml(app, lang);
    return mainHtml
}

function getAppBodyHtml(lang, app, jsLangObj) {
    const bodyHtml = `
        <span id="title" style="display: none">${jsLangObj.title}</span>
        <span id="backgroundImg" style="display: none">${jsLangObj.backgroundImgFile}</span>
        <span id="similar" style="display: none">${jsLangObj.similarText}</span>
        <span id="similarResults" style="display: none">${jsLangObj.similarResults}</span>
        <span id="dissimilarResults" style="display: none">${jsLangObj.dissimilarResults}</span>
        <span id="matchText" style="display: none">${jsLangObj.matchText}</span>
        <header>
            <h1 id="header-title">${jsLangObj.title}</h1>
        </header>
        <main id="app-main" data-app="${app}" data-page="splash">
            <h2 id="main-cta-short"><span class="cta-text">${jsLangObj.callToActionShort}</span></h2>
            <p id="main-cta-long"><span class="cta-text">${jsLangObj.callToActionLong}</span></p>
            <div id="main-view-survey">
                <button id="main-survey-button" data-app=${app}><span>${jsLangObj.buttonText}</span></button>
            </div>
        </main>
        <footer>
            <p>Copyright &copy; 2019 zenglenn42</p>
        </footer>
    `
    return bodyHtml
}

function getSimilarityEngineBodyHtml(lang, jsObj) {
    jsLangObj = getLangObj(lang);
    demoTitles = jsObj.demoTitles(lang);

    let langs = getSupportedLangCodes();
    let langOptions = langs.map((alang, index) => {
        let selected = (lang == alang) ? "selected" : "";
        let langName = getLanguageName(alang)
        return `<option value="${alang}" ${selected}>${langName}</option>`
    });
    let langSelectHtml = `
        <select name="lang" id="select-lang">
            <!-- <option value="">${jsLangObj.selectLangText}</option> -->
            ${langOptions}
        </select>
        `

    let demoTitleKeys = getAppTitleKeys();
    let demoSurveyOptions = demoTitles.map((title, index) => {

        let minifiedApp = demoTitleKeys[index].replace(/[ ]*/g,"");
        return `<option value="/appSkeleton.html?lang=${lang}&app=${minifiedApp}">${title}</option>`
    });
    let demoSelectHtml = `
        <select name="demo" id="select-demo" onchange="window.location.href=this.value;">
            <option value="">${jsLangObj.optionText}</option>
            ${demoSurveyOptions}
        </select>
        `
    const bodyHtml = `
        <span id="title" style="display: none">${jsLangObj.title}</span>
        <span id="backgroundImg" style="display: none">${jsLangObj.backgroundImgFile}</span>
        <header>
            <h1 id="header-title">${jsLangObj.title}</h1>
            <div id="header-padding"></div>
            <div id="header-select-lang">
                ${langSelectHtml}
            </div>
        </header>
        <main>
            <h2 id="main-cta-short"><span class="cta-text">${jsLangObj.callToActionShort}</span></h2>
            <p id="main-cta-long"><span class="cta-text">${jsLangObj.callToActionLong}</span></p>
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

function getSurveyHtml(jsObj) {
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