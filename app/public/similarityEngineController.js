const DEFAULT_LANG = "en";
const DEFAULT_APP = "similarityEngine"

class SimilarityEngineController {
    constructor(lang = DEFAULT_LANG, app = DEFAULT_APP) {
        this.lang = lang;
        this.app = app;
        console.log("controller app = ", app);
        this.getBodyHtml(this.initController.bind(this));
    }

    initController() {
        let title = document.getElementById("title").innerText;
        if (title) {
            document.title = title;
        }
        let langSelectEl = document.getElementById("select-lang");
        this.delegate(document, "change", "#select-lang", this.changeLang.bind(this));
        this.delegate(document, "click",  "#main-survey-button", this.getSurveyHtml.bind(this));
        this.delegate(document, "submit", "#surveyForm", this.postSurveyForm.bind(this));

        this.similarText = document.getElementById("similar").innerText;
        this.similarResults = document.getElementById("similarResults").innerText;
        this.dissimilarResults = document.getElementById("dissimilarResults").innerText;
        this.delegate(document, "click", ".close-btn", (e) => {
            let modal = document.querySelector(".modal")
            modal.style.display = "none"
        });
    }
    
    getLang() {
        return this.lang
    }

    setLang(lang) {
        this.lang = lang;
    }

    changeLang(e) {
        const langSelect = document.getElementById("select-lang");
        this.setLang(langSelect.value);
        console.log("lang = ", this.lang);
        this.getBodyHtml();
    }

    setBackgroundImg(sel) {
        let imgFile = document.getElementById("backgroundImg").innerHTML;
        if (imgFile) {
            console.log("imgFile = ", imgFile);
            document.querySelector(sel).style.backgroundImage = `url('${imgFile}')`;
        }
    }

    domForceRender(elId) {
        console.log("domRedraw:", elId);
        var element = document.getElementById(elId);
        var n = document.createTextNode(' ');
        var disp = element.style.display;  // don't worry about previous display style

        element.appendChild(n);
        element.style.display = 'none';

        setTimeout(function(){
            element.style.display = disp;
            n.parentNode.removeChild(n);
        },200); // you can play with this timeout to make it as short as possible
    }

    // https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on
    delegate(el, evt, sel, handler) {
        console.log("delegate")
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

    getSurveyHtml() {
        let mainEl = document.getElementById("#app-main");
        let queryUrl = `/appMain.html?lang=${this.lang}&app=${this.app}`
        let callback = undefined;
        this.fetchMainHtml(queryUrl, callback);
    }

    getBodyHtml(callback) {
        let queryUrl = "";
        switch (this.app) {
            case "similarityEngine":
                queryUrl = `/${this.app}Body.html?lang=${this.lang}&app=${this.app}`
                break;
            default:
                queryUrl = `/appBody.html?lang=${this.lang}&app=${this.app}`
        }
        this.fetchBodyHtml(queryUrl, callback)
    }

    fetchBodyHtml(url, callback) {
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
                this.setBackgroundImg("main");
                if (callback) {
                    console.log("calling callback")
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

    fetchMainHtml(url, callback) {
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
        ).then(mainHtml => 
            {
                let mainEl = document.querySelector("main");
                mainEl.innerHTML = mainHtml
                // this.setBackgroundImg("main");
                if (callback) {
                    console.log("calling callback")
                    callback(mainEl);
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
