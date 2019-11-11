// We're expressing our survey in terms of a javascript object
// which gets converted to HTML.
//
// This puts us in a nice position to support internationalization at some point.

const surveyObj = {
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

module.exports = surveyObj;