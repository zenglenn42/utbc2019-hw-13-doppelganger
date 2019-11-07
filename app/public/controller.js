
// https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on
delegate = function(el, evt, sel, handler) {
    el.addEventListener(evt, function(event) {
        let t = event.target;
        while (t && t !== this) {
        if (t.matches(sel)) {
            handler.call(t, event);
        }
        t = t.parentNode;
        }
    });
};

// https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e
delegate(document, "click", ".close-btn", (e) => {
    let modal = document.querySelector(".modal")
    modal.style.display = "none"
});

function getSurveyHtml(e) {
    const url = "/survey.html";
    fetch(url).then( response => 
        {
            if (response.ok) {
                return response.text()
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                })
            }
        }
    ).then( surveyHtml => {
            var bodyDiv = document.getElementById("body-container");
            bodyDiv.innerHTML = surveyHtml
        }
    )
    .catch( error => {
        if (error.status === 404) {
            console.log("404 Resource not found.")
        }
    })
}

function postSurveyForm(e) {
    e.preventDefault();
    
    // Normalize form data.
    var formElement = document.querySelector("#surveyForm");
    var formDataObj = normalizeFormData(formElement);
    
    // See: https://css-tricks.com/using-fetch/
    const url = "/submitSurvey.json";
    fetch(
        url, 
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        }
    ).then( response => 
        {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                })
            }
        }
    ).then( (friendObj) => {
        console.log("friendInfo", friendObj)
        let modal = document.querySelector(".modal")
        modal.style.display = "block"
        let friendEl = document.getElementById("friendResults");
        let resultsHtml = `
            <h1>No doppelganger found.  You're utterly unique. ;-)</h1>
        `
        if (friendObj.name) {
            resultsHtml = `
                <h1>${friendObj.name}</h1>
            `
            if (friendObj.photo) {
                resultsHtml += `
                <img class="modal-img" src="${friendObj.photo}" alt="image unavailable">
                `
            }
        }
        friendEl.innerHTML = resultsHtml
    })
    .catch(error => {
        if (error.status === 404) {
            console.log("404 Resource not found.")
        }
    })
}

// Transform key/value pairs from survey form input elements into
// a normalized object structured like this:
//
// formDataObj = {   
//     name: 'Ahmed',
//     photo: 'http://photo.com/some/picture.jpg',
//     scores: [ '5', '1', '4', '4', '5', '1', '2', '5', '4', '1' ] 
// }
//
// We can add some validation checks to this later.

function normalizeFormData(formElement) {
    var formData = new FormData(formElement);
    var formDataObj = {scores: []}
    for (var [key, value] of formData.entries()) {
        if (key.match(/^q[0-9]*/)) {
            formDataObj.scores.push(value);
        } else {
            formDataObj[key] = value;
        }
    }
    return formDataObj
}

// Register click handler for dynamically added survey form.
//
// Responding to the 'submit' event allows us to take advantage of the
// built-in 'required' input validation provided by the browser while
// still using our own client-side method for pre-processing form data
// before we post it to the server.  (Simply responding to a click
// event for the submit button would cause the required field attribute
// to be ignored. :-/)
// 
delegate(document, "submit", "#surveyForm", postSurveyForm);

// Register click handler for survey button which triggers
// get of related html.
var surveyButton = document.getElementById("get-survey-html")
surveyButton.addEventListener("click", getSurveyHtml)

//-----------------------------------------------------
// Old-school way to get and post to the server using
// XMLHttpRequest objects.
//-----------------------------------------------------

// function getSurveyHtmlXhr(e) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', '/survey.html');
//     xhr.setRequestHeader('Content-Type', 'application/html');
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             var bodyDiv = document.getElementById("body-container");
//             bodyDiv.innerHTML = xhr.responseText
//         } else {
//             console.log("xhr.status = ", xhr.status);
//         }
//     }
//     xhr.send(null);
// }

// function postSurveyFormXhr(e) {
//     e.preventDefault();
//     var formElement = document.querySelector("#surveyForm");
//     var formDataObj = normalizeFormData(formElement);
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/submitSurvey.json');
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             var friendInfo = JSON.parse(xhr.responseText);
//             console.log("friendInfo", friendInfo);
//         }
//     }
//     xhr.send(JSON.stringify(formDataObj));
// };