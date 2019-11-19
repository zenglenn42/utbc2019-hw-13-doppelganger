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

const appObjEn = {
    title: "Dance Finder",
    callToActionShort: "Find your best moves",
    callToActionLong: "Answer a few basic questions then find some dances you may want to try.",
    buttonText: "Go to Survey",
    similarResults: "Recommended Dances",
    dissimilarResults: "Dicey Dances",
    similarText: "match",
    imSorry: "I'm sorry",
    noResults: "No results available at this time",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjEn
}

const appObjEs = {
    title: "Buscador de Baile",
    callToActionShort: "Es: Find your best moves",
    callToActionLong: "Es: Answer a few basic questions then find some dances you may want to try.",
    buttonText: "Es: Go to Survey",
    similarResults: "Es: Recommended Dances",
    dissimilarResults: "Es: Dicey Dances",
    similarText: "Es: match",
    imSorry: "Es: I'm sorry",
    noResults: "Es: No results available at this time",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjEs
}

const appObjHi = {
    title: "Hi: Dance Finder",
    callToActionShort: "Hi: Find your best moves",
    callToActionLong: "Hi: Answer a few basic questions then find some dances you may want to try.",
    buttonText: "Hi: Go to Survey",
    similarResults: "Hi: Recommended Dances",
    dissimilarResults: "Hi: Dicey Dances",
    similarText: "Hi: match",
    imSorry: "Hi: I'm sorry",
    noResults: "Hi: No results available at this time",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjHi
}

const appObjZh = {
    title: "Zh: Dance Finder",
    callToActionShort: "Zh: Find your best moves",
    callToActionLong: "Zh: Answer a few basic questions then find some dances you may want to try.",
    buttonText: "Zh: Go to Survey",
    similarResults: "Zh: Recommended Dances",
    dissimilarResults: "Zh: Dicey Dances",
    similarText: "Zh: match",
    imSorry: "Zh: I'm sorry",
    noResults: "Zh: No results available at this time",
    brandingLogo: "Branding-Logo.png",
    poweredbyLogo: "SimilarityEngineLogo.png",
    i18nLogo: "i18nLogo.png",
    survey: surveyObjZh
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