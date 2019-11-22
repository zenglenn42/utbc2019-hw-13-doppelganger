const DEFAULT_LANG = "en"
const {
    getDemoTitles,
    getDemoTitleKeys,
    getDemoObj,
    getDemoImg
 }  = require("./demoSurveyObjs.js")

const similarityEngineEn = {
    langName:          "English",
    title:             "Similarity Engine",
    aboutButtonText:   "About",
    aboutText:         "Add more extensive text about this application and how it works here ...",
    callToActionShort: "Find a similar respondent to a survey.",
    callToActionLong:  "Complete a survey to quantify similarity between you and other survey respondents or archetypes.",
    selectDemoText:    "Try it ...",
    optionText:        "Choose an application",
    selectLangText:    "Language"
}

const similarityEngineEs = {
    langName:          "Español",
    title:             "Motor de Similitud",
    aboutButtonText:   "Acerca de",
    aboutText:         "Agregue texto más extenso sobre esta aplicación y cómo funciona aquí ...",
    callToActionShort: "Encuentra a alguien que responda encuestas como tú.",
    callToActionLong:  "Complete una encuesta para cuantificar la similitud entre usted y otros encuestados o arquetipos de la encuesta.",
    selectDemoText:    "Intentalo ...",
    optionText:        "Elige una aplicación",
    selectLangText:    "Idioma"
}

const similarityEngine = {
    lang: {
        "en": similarityEngineEn,
        "es": similarityEngineEs,
    },
    backgroundImgFile: "vsmilelx-l6JiEFGaDIQ-unsplash.jpg",
    demoTitles:        getDemoTitles,
    gitHubIcon:        "",
    gitHubRepoUrl:     "https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine",
    i18nIcon:          ""
}

function getSupportedLangCodes() {
    let langCodes = [];
    for (let langCode in similarityEngine["lang"]) {
        langCodes.push(langCode);
    }
    return langCodes;
}

function getLanguageName(lang) {
    return getLangObj(lang).langName;
}

function getLangObj(lang = DEFAULT_LANG) {
    let jsObj = similarityEngine["lang"].lang;
    return (similarityEngine["lang"][lang]) ? 
            similarityEngine["lang"][lang] : similarityEngine["lang"][DEFAULT_LANG];
}

function getObj() {
    return similarityEngine;
}

function getSupportedLangs() {
    return ["en", "Español"]
}

function getAppObj(app, lang) {
    return getDemoObj(app, lang)
}

function getAppTitleKeys() {
    return getDemoTitleKeys()
}

function getAppImg(app, lang) {
    return getDemoImg(app, lang)
}

module.exports = { 
    getObj, 
    getLangObj, 
    getLanguageName, 
    getSupportedLangCodes, 
    getAppObj, 
    getAppTitleKeys, 
    getAppImg 
}