const DEFAULT_LANG = "en";

class SurveyController {
    constructor(lang = DEFAULT_LANG) {
        // console.log("SurveyController::constructor()");
        
        // Once the rest of the home page body elements are dynamically 
        // added to the DOM, complete controller initialization by
        // adding other event handlers.
        this.lang = lang;
        let initControllerCB = this.initController.bind(this);
        this.getHomeBodyHtml(initControllerCB)
    }

    initController() {
        let titleText = document.getElementById("title").innerText;
        this.similarText = document.getElementById("similar").innerText;
        this.similarResults = document.getElementById("similarResults").innerText;
        this.dissimilarResults = document.getElementById("dissimilarResults").innerText;
        if (titleText) {
            document.title = titleText;
        }

        // console.log("initController");
        // https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e
        this.delegate(document, "click", ".close-btn", (e) => {
            let modal = document.querySelector(".modal")
            modal.style.display = "none"
        });

        // Register click handler for survey button which triggers
        // get of related html.
        const surveyButton = document.getElementById("get-survey-html");
        const getSurveyBodyHtmlCB = this.getSurveyBodyHtml.bind(this)
        surveyButton.addEventListener("click", getSurveyBodyHtmlCB);

        const langSelect = document.getElementById("select-lang");
        langSelect.addEventListener("change", this.changeLangCB.bind(this));

        // Register click handler for dynamically added survey form.
        //
        // Responding to the 'submit' event allows us to take advantage of the
        // built-in 'required' input validation provided by the browser while
        // still using our own client-side method for pre-processing form data
        // before we post it to the server.  (Simply responding to a click
        // event for the submit button would cause the required field attribute
        // to be ignored. :-/)
        // 
        this.delegate(document, "submit", "#surveyForm", this.postSurveyForm.bind(this));
        this.delegate(document, "click", "#api-button", this.getApiJson.bind(this));
    }
    
    getLang() {
        return this.lang
    }

    setLang(lang) {
        this.lang = lang;
    }

    changeLangCB(e) {
        const langSelect = document.getElementById("select-lang");
        this.setLang(langSelect.value);
        this.getHomeBodyHtml(this.initController.bind(this));
        // Hacky way to get body div to refresh with new lang.
        this.elRedraw("body-container");
        let bc = document.getElementById("body-container");
        bc.style.display = "block"
    }

    elRedraw(elId) {
        console.log("domRedraw");
        var element = document.getElementById(elId);
        console.log("element = ", element);
        var n = document.createTextNode(' ');
        var disp = element.style.display;  // don't worry about previous display style

        element.appendChild(n);
        element.style.display = 'none';

        setTimeout(function(){
            element.style.display = disp;
            n.parentNode.removeChild(n);
        },100); // you can play with this timeout to make it as short as possible
    }

    // https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on
    delegate(el, evt, sel, handler) {
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

    getHomeBodyHtml(callback) {
        let queryUrl = `/homeBody.html?lang=${this.lang}`
        this.getBodyHtml(queryUrl, callback)
    }

    getSurveyBodyHtml(e) {
        this.getBodyHtml(`/surveyBody.html?lang=${this.lang}`)
    }

    getApiJson(e) {
        this.getBodyHtml("/surveyRespondents.json", (bodyDiv, body) => {
            bodyDiv.innerHTML = `<pre>${body}</pre>`
        });
    }

    getBodyHtml(url, callback) {
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
        ).then( body => {
                var bodyDiv = document.getElementById("body-container");
                bodyDiv.innerHTML = body;
                if (callback) {
                    callback(bodyDiv, body);
                }
            }
        )
        .catch( error => {
            if (error.status === 404) {
                console.log("404 Resource not found.")
            }
        })
    }

    postSurveyForm(e) {
        e.preventDefault();

        // Normalize form data.
        var formElement = document.querySelector("#surveyForm");
        var formDataObj = this.normalizeFormData(formElement);

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
        ).then(response => 
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
        ).then(resultsObj => {
            console.log("resultsObj", resultsObj)
            let modal = document.querySelector(".modal")
            modal.style.display = "block"
            let resultsEl = document.getElementById("results");
            let resultsHtml = `
                <h1>No results.</h1>
            `
            if (resultsObj.name) {
                resultsHtml = `
                    <h1>${this.similarResults}</h1>
                    <h2>${resultsObj.name}</h2>
                `
                if (resultsObj.photo) {
                    resultsHtml += `
                    <img class="modal-img" src="${resultsObj.photo}" alt="image unavailable">
                    `
                }
                if (resultsObj.percent) {
                    resultsHtml += `
                    <h2>${resultsObj.percent}% ${this.similarText}</h2>
                    `
                }
                if (resultsObj.nameLeast) {
                    resultsHtml += `
                        <h1>${this.dissimilarResults}</h1>
                        <h2>${resultsObj.nameLeast}</h2>
                    `
                    if (resultsObj.photoLeast) {
                        resultsHtml += `
                        <img class="modal-img" src="${resultsObj.photoLeast}" alt="image unavailable">
                        `
                    }
                    if (resultsObj.percentLeast) {
                        resultsHtml += `
                        <h2>${resultsObj.percentLeast}% ${this.similarText}</h2>
                        `
                    }
                }
            }
            resultsEl.innerHTML = resultsHtml
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

    normalizeFormData(formElement) {
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
}

//-----------------------------------------------------
// Old-school way to get and post to the server using
// XMLHttpRequest objects.
//-----------------------------------------------------

// function getSurveyBodyHtmlXhr(e) {
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
//             var resultsInfo = JSON.parse(xhr.responseText);
//             console.log("resultsInfo", resultsInfo);
//         }
//     }
//     xhr.send(JSON.stringify(formDataObj));
// };