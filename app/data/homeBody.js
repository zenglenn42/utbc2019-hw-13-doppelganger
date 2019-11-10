var homeBodyObj = {
    callToActionShort: "Find your Doppelgänger",
    callToActionLong: "Answer a few basic questions then find someone who may be your twin stranger.",
    buttonText: "Go to Survey"
}

function getHtml(json) {
    let homeBodyHtml = `
        <h1>${json.callToActionShort}</h1>
        <p>${json.callToActionLong}</p>
        <button id="get-survey-html">${json.buttonText}</button>
    `
    return homeBodyHtml
}

module.exports = getHtml(homeBodyObj);
