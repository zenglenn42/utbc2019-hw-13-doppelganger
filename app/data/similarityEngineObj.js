const DEFAULT_LANG = "en"
const {
    getDemoTitles,
    getDemoTitleKeys,
    getDemoObj,
    getDemoImg,
    getDemoSurveyRespondents,
    getDemoSurveyHtml,
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
    selectLangText:    "Language",
    backgroundImgFile: "similarityEngineBackground.jpg"
}

const similarityEngineZh = {
    langName:          "简体中文",
    title:             "相似引擎",
    aboutButtonText:   "关于",
    aboutText:         "在此添加有关此应用及其工作原理的更广泛的文字 ...",
    callToActionShort: "查找调查表的类似受访者",
    callToActionLong:  "完成一项调查以量化您与其他调查受访者或原型之间的相似性",
    selectDemoText:    "试试吧 ...",
    optionText:        "选择一个应用",
    selectLangText:    "语言",
    backgroundImgFile: "similarityEngineBackground.jpg"
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
    selectLangText:    "Idioma",
    backgroundImgFile: "similarityEngineBackground.jpg"
}

const similarityEngineHi = {
    langName:          "हिंदी",
    title:             "समानता इंजन",
    aboutButtonText:   "के बारे में",
    aboutText:         "इस एप्लिकेशन के बारे में और अधिक विस्तृत पाठ जोड़ें और यह यहाँ कैसे काम करता है ...",
    callToActionShort: "किसी ऐसे व्यक्ति का पता लगाएं जो सर्वेक्षण के समान प्रतिक्रिया करता है।",
    callToActionLong:  "आप और अन्य सर्वेक्षण उत्तरदाताओं या आर्कटाइप्स के बीच समानता निर्धारित करने के लिए एक सर्वेक्षण पूरा करें।",
    selectDemoText:    "कोशिश करो ...",
    optionText:        "एक एप्लिकेशन चुनें",
    selectLangText:    "भाषा",
    backgroundImgFile: "similarityEngineBackground.jpg"
}

const similarityEngine = {
    lang: {
        "en": similarityEngineEn,
        "es": similarityEngineEs,
        "zh": similarityEngineZh,
        "hi": similarityEngineHi
    },
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

function getAppObj(app, lang) {
    return getDemoObj(app, lang)
}

function getAppTitleKeys() {
    return getDemoTitleKeys()
}

function getAppImg(app, lang) {
    return getDemoImg(app, lang)
}

function getAppSurveyRespondents(app, lang) {
    return getDemoSurveyRespondents(app, lang)
}

function getAppSurveyHtml(app, lang) {
    return getDemoSurveyHtml(app, lang)
}

module.exports = { 
    getObj, 
    getLangObj, 
    getLanguageName, 
    getSupportedLangCodes, 
    getAppObj, 
    getAppTitleKeys, 
    getAppImg,
    getAppSurveyRespondents,
    getAppSurveyHtml
}
