// We're expressing our home page body in terms of a javascript object
// which gets converted to HTML.
//
// Rudimentary support is provided for internationlization.

const DEFAULT_LANG = "en"
const homeBodyEn = {
    title: "Mind Meld",
    callToActionShort: "Find your mental doppelgänger",
    callToActionLong: "Answer a few basic questions then find someone who may be your mental twin.",
    buttonText: "Go to Survey"
}

const homeBodyEs = {
    title: "Mind Meldo",
    callToActionShort: "Find your mental doppelgänger (spanish)",
    callToActionLong: "Answer a few basic questions then find someone who may be your mental twin.",
    buttonText: "Go to Survey"
}

const homeBody = {
    "en": homeBodyEn,
    "es": homeBodyEs
}

function getObj(lang = DEFAULT_LANG) {
    return (homeBody[lang]) ? homeBody[lang] : homeBody[DEFAULT_LANG];
}

module.exports = getObj;
