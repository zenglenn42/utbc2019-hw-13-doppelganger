// We're expressing our survey in terms of a javascript object
// which gets converted to HTML.
//
// This puts us in a nice position to support internationalization at some point.

const formObj = {
    title: "About You",
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
    resetText: "Reset"
};

function getHtml(json) {
    const minComment = json.minComment;
    const maxComment = json.maxComment
    let questionsHtml = json.questions.map((question, index) => {
        let num = index + 1;
        let questionHtml = `
            <h3><strong>Question ${num}</strong></h3>
            <h4>${question}</h4>
            <select class="chosen-select" id="q${num}" required>
                <option value=""></option>
                <option value="1">1 (${minComment})</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (${maxComment})</option>
            </select>
            `
        return questionHtml
    }).join();
    let surveyHtml = `
        <div class="container">
        <h2>Survey Questions</h2>
        <hr>
        <form>
            <legend><h3><strong>${json.title}</strong></legend>
            <label><h4>${json.nameLabel}</h4><input name="name" type="text" placeholder="${json.namePlaceholder}" required></input></label>
            <label><h4>${json.photoLabel}</h4><input name="photoUrl" type="text" placeholder="${json.photoPlaceholder}" required></input></label>
            <hr>
            ${questionsHtml}
            <p>
                <input type="submit" value="${json.submitText}">
                <input type="reset" value="${json.resetText}">
            </p>
        </form>
        </div>
        `
    return surveyHtml
}

module.exports = getHtml(formObj);