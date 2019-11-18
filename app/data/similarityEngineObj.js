const DEFAULT_LANG = "en"

const similarityEngineEn = {
    langName:          "English",
    title:             "Similarity Engine",
    aboutButtonText:   "About",
    aboutText:         "Add more extensive text about this application and how it works here ...",
    callToActionShort: "Find a similar respondent to a survey.",
    callToActionLong:  "Complete a survey to quantify similarity between you and other survey respondents or archetypes.",
    selectDemoText:    "Try it ...",
    optionText:        "Choose a survey"
}

const similarityEngineEs = {
    langName:          "Español",
    title:             "Es:Similarity Engine",
    aboutButtonText:   "Es:About",
    aboutText:         "Es:Add more extensive text about this application and how it works here ...",
    callToActionShort: "Es:Find a similar respondent to a survey.",
    callToActionLong:  "Es:Complete a survey to quantify similarity between you and other survey respondents or archetypes.",
    selectDemoText:    "Es:Try it ...",
    optionText:        "Es:Choose a survey"
}

const similarityEngine = {
    lang: {
        "en": similarityEngineEn,
        "es": similarityEngineEs,
    },
    backgroundImgFile: "vsmilelx-l6JiEFGaDIQ-unsplash.jpg",
    demoSurveys:       ["Friend Finder", "Dance Finder"],
    gitHubIcon:        "",
    gitHubRepoUrl:     "https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine",
    i18nIcon:          ""
}

function getLangObj(lang = DEFAULT_LANG) {
    let jsObj = similarityEngine["lang"].lang;
    return (similarityEngine["lang"][lang]) ? 
            similarityEngine["lang"][lang]  : similarityEngine["lang"][DEFAULT_LANG];
}

function getObj() {
    return similarityEngine;
}

module.exports = { getObj, getLangObj }
