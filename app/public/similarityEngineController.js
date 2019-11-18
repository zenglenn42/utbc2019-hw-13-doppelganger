const DEFAULT_LANG = "en";

class SimilarityEngineController {
    constructor(lang = DEFAULT_LANG) {
        // Once the rest of the home page body elements are dynamically 
        // added to the DOM, complete controller initialization by
        // adding other event handlers.
        this.lang = lang;
        this.getBodyHtml(this.initController.bind(this))
    }

    initController() {
        let title = document.getElementById("title").innerText;
        if (title) {
            document.title = title;
        }
        const langSelect = document.getElementById("select-lang");
        langSelect.addEventListener("change", this.changeLang.bind(this));
        this.delegate(document, "change", "#select-survey", this.getSurvey.bind(this));
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
        let bodyDiv = document.getElementById("body-container");
        let page = bodyDiv.getAttribute("page");
        switch(page) {
            case "survey":
                this.getSurveyBodyHtml();
                break;

            case "home":
            default:
                this.getBodyHtml(this.initController.bind(this));
        }
  
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

    getBodyHtml(callback) {
        let queryUrl = `/similarityEngineBody.html?lang=${this.lang}`
        let page = "home"
        this.fetchBodyHtml(queryUrl, page, callback)
    }

    fetchBodyHtml(url, page, callback) {
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
                console.log("body html = ", body)
                var bodyDiv = document.getElementById("body-container");
                bodyDiv.innerHTML = body;
                bodyDiv.setAttribute("page", page);
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
}
