// We're expressing our home page body in terms of a javascript object
// which gets converted to HTML.
//
// Rudimentary support is provided for internationlization.

const DEFAULT_LANG = "en"

const { 
    surveyObjEn,
    surveyObjEs,
    surveyObjHi,
    surveyObjZh,
} = require("./danceFinderSurveyObj.js")

const surveyRespondents = require("./danceFinderRespondentsObj.js");

const appObjEn = {
    title: "Dance Finder",
    callToActionShort: "Find your best moves",
    callToActionLong: "Answer a few basic questions then find some dances you may want to try.",
    buttonText: "Go to Survey",
    similarResults: "Recommended Dances",
    dissimilarResults: "Dicey Dances",
    similarText: "match",
    matchText: "match",
    imSorry: "I'm sorry",
    noResults: "No results available at this time",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjEn,
    respondents: surveyRespondents,
    backgroundImgFile: "DanceFinderBackground.jpg"
}

const appObjEs = {
    title: "Buscador de Baile",
    callToActionShort: "Vamos a bailar",
    callToActionLong: "Responda algunas preguntas básicas y luego encuentre algunos bailes que quiera probar.",
    buttonText: "Ir a la Encuesta",
    similarResults: "Más Similar",
    dissimilarResults: "Menos Sympatico",
    similarText: "similar",
    matchText: "igual",
    imSorry: "Lo siento",
    noResults: "No hay partidos disponibles en este momento",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjEs,
    respondents: surveyRespondents,
    backgroundImgFile: "DanceFinderBackground.jpg"
}

const appObjHi = {
    title: "नृत्य खोजक",
    callToActionShort: "चलो नाचो",
    callToActionLong: "कुछ बुनियादी सवालों के जवाब दें, फिर कुछ ऐसे नृत्य ढूंढें जिन्हें आप आज़माना चाहते हैं।",
    buttonText: "सर्वे करने जाएं",
    similarResults: "सबसे समान",
    matchText: "आत्मीयता",
    dissimilarResults: "कम समान",
    similarText: "समान",
    matchText: "समान",
    imSorry: "मुझे माफ कर दो",
    noResults: "इस समय कोई परिणाम उपलब्ध नहीं हैं।",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjHi,
    respondents: surveyRespondents,
    backgroundImgFile: "DanceFinderBackground.jpg"
}

const appObjZh = {
    title: "舞蹈发现者",
    callToActionShort: "让我们一起跳舞",
    callToActionLong: "回答一些基本问题，然后找到一些您可能想尝试的舞蹈。",
    buttonText: "前往问卷",
    similarResults: "最相似",
    matchText: "亲和力",
    dissimilarResults: "最少相似",
    similarText: "类似",
    matchText: "类似",
    imSorry: "对不起",
    noResults: "目前没有可用结果",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjZh,
    respondents: surveyRespondents,
    backgroundImgFile: "DanceFinderBackground.jpg"
}

function getDanceFinderImg() {
    return appObj.backgroundImgFile;
}

const appObjs = {
    "en": appObjEn,	// English
    "es": appObjEs,	// Spanish/Español
    "hi": appObjHi,	// Hindi/हिंदी
    "zh": appObjZh	// Simplified Chinese/简体中文
}

function getObjDanceFinder(lang = DEFAULT_LANG) {
    return (appObjs[lang]) ? appObjs[lang] : appObjs[DEFAULT_LANG];
}

module.exports = {
    getObjDanceFinder
}