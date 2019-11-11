// We're expressing our survey in terms of a javascript object
// which gets converted to HTML.
//
// Rudimentary support is provided for internationlization.

const DEFAULT_LANG = "en"
const surveyBodyEn = {
    surveyTitle: "Survey Questions",
    formHeading: "About You",
    nameLabel: "Name",
    namePlaceholder: "name required",
    photoLabel: "Link to your photo",
    photoPlaceholder: "url required",
    minComment: "strongly disagree",
    maxComment: "strongly agree",
    questions: [
        "Your mind is always buzzing with unexplored ideas and plans.",
        "Generally speaking, you rely more on your experience than your imagination.",
        "You find it easy to stay relaxed and focused even when there is some pressure.",
        "You rarely do something just out of sheer curiosity.",
        "People can rarely upset you.",
        "It is often difficult for you to relate to other people’s feelings.",
        "In a discussion, truth should be more important than people’s sensitivities.",
        "You rarely get carried away by fantasies and ideas.",
        "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.",
        "You feel more energetic after spending time with a group of people.",
    ],
    submitText: "Submit",
    resetText: "Reset",
    apiText: "API"
};

const surveyBodyEs = {
    surveyTitle: "Preguntas de la Encuesta",
    formHeading: "Acerca de ti mismo",
    nameLabel: "Nombre",
    namePlaceholder: "Nombre requerido",
    photoLabel: "Enlace a tu foto",
    photoPlaceholder: "url requerida",
    minComment: "muy en desacuerdo",
    maxComment: "totalmente de acuerdo",
    questions: [
        "Tu mente siempre está llena de ideas y planes inexplorados.",
        "En términos generales, confías más en tu experiencia que en tu imaginación.",
        "Le resulta fácil mantenerse relajado y concentrado incluso cuando hay algo de presión.",
        "Raramente haces algo solo por pura curiosidad.",
        "La gente rara vez puede molestarte.",
        "A menudo le resulta difícil relacionarse con los sentimientos de otras personas.",
        "En una discusión, la verdad debería ser más importante que las sensibilidades de las personas.",
        "Rara vez te dejas llevar por fantasías e ideas.",
        "Cree que las opiniones de todos deben respetarse independientemente de si están respaldadas por hechos o no.",
        "Te sientes más enérgico después de pasar tiempo con un grupo de personas.",
    ],
    submitText: "Enviar",
    resetText: "Reiniciar",
    apiText: "API"
};

const surveyBody = {
    "en": surveyBodyEn,
    "es": surveyBodyEs
}

function getObj(lang = DEFAULT_LANG) {
    return (surveyBody[lang]) ? surveyBody[lang] : surveyBody[DEFAULT_LANG];
}

module.exports = getObj;