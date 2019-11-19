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
} = require("./friendFinderSurveyObj.js")

const appObjEn = {
    title: "Friend Finder",
    callToActionShort: "Find your mental doppelgänger!",
    callToActionLong: "Answer a few basic questions then find someone among others who is closest to you in outlook.",
    buttonText: "Go to Survey",
    similarResults: "Most Similar",
    dissimilarResults: "Least Similar",
    similarText: "similar",
    imSorry: "I'm sorry",
    noResults: "No results available at this time",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "similarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjEn
}

const appObjEs = {
    title: "Buscador de Amigos",
    callToActionShort: "Encuentra tu doppelganger mental!",
    callToActionLong: "Responda algunas preguntas básicas y luego encuentre a alguien más cercano a usted en perspectiva.",
    buttonText: "Ir a la Encuesta",
    similarResults: "Más Similar",
    dissimilarResults: "Menos Sympatico",
    similarText: "similar",
    imSorry: "Lo siento",
    noResults: "No hay partidos disponibles en este momento",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "similarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjEs
}

const appObjHi = {
    title: "मित्र दूनढने",
    callToActionShort: "अपने मानसिक डॉपेलगैंगर का पता लगाएं!",
    callToActionLong: "कुछ बुनियादी सवालों के जवाब दें और किसी को समान समझ के साथ खोजें।",
    buttonText: "सर्वे करने जाएं",
    similarResults: "सबसे समान",
    dissimilarResults: "कम समान",
    similarText: "समान",
    imSorry: "मुझे माफ कर दो",
    noResults: "इस समय कोई परिणाम उपलब्ध नहीं हैं।",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "similarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjHi
}

const appObjZh = {
    title: "朋友查找器",
    callToActionShort: "查找相似的人。",
    callToActionLong: "回答一些基本问题，找到离您最近的人。",
    buttonText: "前往问卷",
    similarResults: "最相似",
    dissimilarResults: "最少相似",
    similarText: "类似",
    imSorry: "对不起",
    noResults: "目前没有可用结果",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "similarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjZh
}

const appObjs = {
    "en": appObjEn,	// English
    "es": appObjEs,	// Spanish/Español
    "hi": appObjHi,	// Hindi/हिंदी
    "zh": appObjZh	// Simplified Chinese/简体中文
}

function getObjFriendFinder(lang = DEFAULT_LANG) {
    return (appObjs[lang]) ? appObjs[lang] : appObjs[DEFAULT_LANG];
}

module.exports = {
    getObjFriendFinder
}