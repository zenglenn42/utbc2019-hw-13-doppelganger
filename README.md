# utbc2019-hw-13-similarity-engine [(demo)](https://still-stream-71803.herokuapp.com)

Find a similar survey respondent.

![alt](docs/img/vsmilelx-l6JiEFGaDIQ-unsplash.jpg)
##### Photo by 浮萍 闪电 on Unsplash

## Specification

Implement a full-stack site that takes user survey results and compares those to other users' surveys to deduce and display the name and picture of the user with the most proximate responses.  

The pool of known people is represented by an in-memory array seeded by a [static js file](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/master/app/data/respondents.js).  The array is augmented over time as the site remains operative and new users submit their responses.

This is not a full CRUD (Create, Retrieve, Update, Delete) application.  Nominally only create and retrieve are required at the record level.

## Minimal Implementation

![alt](docs/img/ui.jpg)

## Ahora en Español ;-)

![alt](docs/img/ui-i18n-es.png)

## Technology stack

* Frontend
  * HTML, CSS
  * Object Oriented JS

* Backend
  * Node.js
  * Express.js
  * [Functional](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/c096a76fe929ffb09ff0306ddaa35f57ebbd1975/app/data/survey.js#L33) JS
  * i18n

## Server-side cheet sheet ;-)

Refresh your brain [here](docs/notes.md).

## Designer's Blog

I know the point of this exercise is just to:

* slap together a web server
* present a form to the user
* post user data to the backend
* perform a server-side calculation
* present results to the frontend

However ...

### "There's options!"

![alt](docs/img/raphael-schaller-D6uxeDSylxo-unsplash.jpg)

Ajax? jQuery? Bootstrap? Templates? i18n?

These are the questions running through my mind.  It's such a simple application but I kinda want to future-proof it a bit.

I could go with a couple static html files, one for the home page, one for the survey.  The survey could hardcode a route for scoring the response data and return a match from the in-memory respondents list.

It's all very adequate and 90's-ish ... and not what I'm going to do.

### JSON-based Survey Form

Whenever I see a bunch of hardcoded HTML, it just feels wrong.  

* there's no scalability of content
* we've limited our frontend options
* we've complicated support for internationalization

So I make form construction [data driven](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/d442fb6c55779c5ddb94c7c18864624ae8f54136/app/data/surveyBody.js#L6), opting for some server side [HTML generation](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/d442fb6c55779c5ddb94c7c18864624ae8f54136/app/routing/htmlRoutes.js#L37).

```
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
    resetText: "Reset"
};
```

What we have now is much more of a similarity /engine/ since we can add or edit the survey questions without changing any code.

![alt](docs/img/black-and-white-round-car-air-filter-159293.jpg)

Even the body of our home page gets distilled into a [js object](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/69fbcf7a337f968649b442d4471d38b479af6d25/app/data/homeBody.js#L1) and [reinflated to HTML](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/69fbcf7a337f968649b442d4471d38b479af6d25/app/routing/htmlRoutes.js#L27) as needed.

Down the road (when VC clears ;-), we could easily send the raw JSON down to the frontend where it could be clothed in some spiffy [Material UI](https://material-ui.com/) components.

Interestingly, this decision steers the next.

### Ajax, bring it

![alt](docs/img/alexandru-g-stavrica-1OFBOk1rfHU-unsplash.jpg)

Our dynamically generated form implies Ajax by definition since we've diverged from serving up static pages of HTML along file boundaries.

But how do we make those Ajax requests?

* old school XMLHttpRequest
* 3rd party library (like jQuery or axios)?
* Fetch api?

Strangely, I feel a bit nostalgic for the XMLHttpRequest interface in the DOM.  It's /the/ archetypal mechanism for supporting Ajax requests originating from the browser so it's now universally supported.  

Plus there are a ton of examples illustrating how to use it with RESTful verbs (GET, POST, etc).  I even wire up my frontend to the server with [XHR](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/d442fb6c55779c5ddb94c7c18864624ae8f54136/app/public/controller.js#L173) in a low impedance dash to get stuff communicating.

But that feels a bit too retro.  I mean there's a /reason/ why 3rd party solutions for doing Ajax manifested.

Arguably, they:

* offer simpler usage patterns
* normalize the API (if browser support diverges)

### I break with thee, jQuery ❌

Despite the alure of 3rd party libraries, I'm keeping jQuery at arm's length.  Sure, it offers enormous utility, including these tasty ajax functions:

```it
    $.get(URL,callback); 
    $.post(URL,data,callback); 
    $.ajax(url[, options])
```

But if it's so handy, I (or some maintainer) may start using some of its DOM manipulation entry points, complicating my efforts to leverage virtual-DOM based technologies (like [React](https://reactjs.org/)) that could improve the user experience down the road.

Who knows, maybe one day I'll feel the same way about 3rd party virtual-DOM manipulators as I do about jQuery. :D

Abandoning jQuery means I need to find an alternative to the hyper-useful:

```
    $(document).on(event, selector, callback)
```

which registers event handlers for dynamically generated DOM elements, exactly the case with our [survey form](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/d442fb6c55779c5ddb94c7c18864624ae8f54136/app/public/controller.js#L36).

[This will suffice](https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on), though it may need to be hardened in production:

```
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
```

As for axios, I've used it in other projects and it's a fine API.  But I want to stay current with browser standards (and maybe polyfill as needed).

### ["That's so Fetch"](https://media.giphy.com/media/vJ6hRee1ZlyNi/giphy.gif)

It seems like the [fetch API](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api) is the new hotness because:

* I don't have to rely on a 3rd party API.
* Browser support is decent.
* It offers a modern, promise-based, usage pattern.

It /is/ a bit weird to [POST something by calling fetch](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/a07d40a5a4a0826891dbce0ae40542a5c825bb17/app/public/controller.js#L100), though.  Whatever, we all learned to shut down Windows by pressing start.

Happily I find [this resource](https://css-tricks.com/using-fetch/) for using fetch with non-trivial error handling.  (I weather another pang for XHR. :-/)

### Intrinsic Beauty -- [Object Oriented Controller](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/blob/d442fb6c55779c5ddb94c7c18864624ae8f54136/app/public/controller.js#L2)

![alt](docs/img/hannah-troupe-s5PoKQEHnxk-unsplash.jpg)

Sometimes appearances can be deceiving.  We judge too soon.  The UI is pretty plain at the moment, but under the covers is a nice object oriented survey controller that enables behavior.  We instantiate it in our home page html:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <script type="text/javascript" src="controller.js"></script>
</head>
<body>
    <div id="body-container">
        <h1>Find your Doppelgänger</h1>
        ..
    </div>
</body>
    <script type="text/javascript">
        document.addEventListener(
            "DOMContentLoaded",
            (event) => { surveyController = new SurveyController(); }
                         -----------------------------------------
        );
    </script>
</html>
```

In the controller's constructor, we register event handlers which allow the application to post survey data and get results back from the server to display.

```
class SurveyController {
    constructor() {
        let initControllerCB = this.initController.bind(this);
        this.getHomeBodyHtml(initControllerCB)
    }

    initController() {
        let titleText = document.getElementById("title").innerText;
        if (titleText) {
            document.title = titleText;
        }

        this.delegate(document, "click", ".close-btn", (e) => {
            let modal = document.querySelector(".modal")
            modal.style.display = "none"
        });

        // Register click handler for dynamically added survey form.
        this.delegate(document, "submit", "#surveyForm", this.postSurveyForm.bind(this));

        // Register click handler for survey button which gets survey html.
        var surveyButton = document.getElementById("get-survey-html")
        surveyButton.addEventListener("click", this.getSurveyBodyHtml.bind(this))
    }
    ...
}
```

### Form Data Validation

![alt](docs/img/david-travis-WC6MJ0kRzGw-unsplash.jpg)

While leveraging browser-supplied functionality, I employ the 'required' HTML attribute for my ```<input>``` form elements.

```
    <form id="surveyForm">
        <h1>About You</h1>
        <input name="name" type="text" required></input>
                                       --------
        <hr>
        ..
    </form>
```

Normally, this prevents the user from submitting incomplete forms to the server.  However my initial implementation defeats this desired behavior because I naively hook into the "click" event for the submit button (to bypass non-Ajaxy form processing with ACTION="```<surver-route>```").  Sadly, that fools the DOM into thinking I'm going rogue and will take on /all/ validation tasks with my custom submit handler.

The trick to get Ajax posting AND non-empty field validation by the browser is to:

* drop the ACTION="blah" METHOD="POST" form attributes
* leave the submit button alone
```
    <form id="surveyForm">
        ..
        <input type="submit" value="Submit">
    </form>
```

* register a handler for the form's 'submit' event
```
    delegate(document, "submit", "#surveyForm", postSurveyForm);
    ...
    function postSurveyForm(e) {
        e.preventDefault();
        ..
        fetch(
            "/submitSurvey.json", 
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        ).then( response => { /* handle response */ }
        ).catch( error =>   { /* handle error */ }
        )
    }
```

Now when I try to submit with an empty input field, I'm rewarded with a bit of browser-supplied animation that guides me to the empty field:

![alt](docs/img/required-field.png)

### Modals

The specification requires us to report results in a modal window.  Since I'm going super minimal on the UI for now, I'm tempted to use a simple alert or info box from the DOM, but these only support text and I need something that will at least allow an ```<img>``` tag, if not other HTML.

I could go with a 3rd party library like sweetalerts, but I find something more spare [here](https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e).

The essense of the solution is to define some CSS classes and associate those with some ```<div>```'s to control visibility (and animation!).

```
    <div class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div id="results">
            </div>
        </div>
    </div>
```

Initially we tweak the ```display``` attribute of the div:

```
    let modal = document.querySelector(".modal")
    modal.style.display = "none"
```

and then in the callback that processes results, we enable the modal:

```
    modal.style.display = "block"
```

## i18n anyone?

![alt](docs/img/ui-i18n-es-320.png)

With a couple hours work this morning, I leverage the jsonified UI content to produce an internationalized version of the similarity engine.  New languages can now be added in minutes.

Most of the work is [here](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/compare/39321344cca8733956fa0d52fcf1939c0c6c557c...2a6564eb9c28c2921ade2ebaff49468cbc11f09f).  I may go back and add a selection option in the UI to select language.  Careful readers will notice a bug (which I've [fixed](https://github.com/zenglenn42/utbc2019-hw-13-similarity-engine/commits/)) with 'Question' not getting translated.

Integration on the frontend happens at the controller level which can be instantiated with a preferred language or modified after the fact through a SurveyController.setLang(lang) method:

```
<body>
    <div id="body-container">
    </div>
    <script type="text/javascript">
        document.addEventListener(
            "DOMContentLoaded",
            (event) => { surveyController = new SurveyController("es"); }
                                                                 ----
        );
    </script>
</body>
```
this injects a lang parameter into our query url

```
getHomeBodyHtml(callback) {
    let queryUrl = `/homeBody.html?lang=${this.lang}`
                                    -----------------
    this.getBodyHtml(queryUrl, callback)
}
```

which is interpreted by the server:

```
app.get("/homeBody.html", (req, res) => {
    let lang = req.query.lang;
    res.send(getHomeBodyHtml(getHomeBodyObj(lang)));
});
```

which performs a look-up into our various translated UI content objects:

```
const DEFAULT_LANG = "en"
const homeBodyEn = {
    title: "Friend Finder",
    callToActionShort: "Find your mental doppelgänger!",
    callToActionLong: "Answer a few basic questions then find someone among others who is closest to you in outlook.",
    buttonText: "Go to Survey"
}

const homeBodyEs = {
    title: "Buscador de Amigos",
    callToActionShort: "Encuentra tu doppelganger mental!",
    callToActionLong: "Responda algunas preguntas básicas y luego encuentre a alguien más cercano a usted en perspectiva.",
    buttonText: "Ir a la Encuesta"
}

const homeBody = {
    "en": homeBodyEn,
    "es": homeBodyEs
}

function getObj(lang = DEFAULT_LANG) {
    return (homeBody[lang]) ? homeBody[lang] : homeBody[DEFAULT_LANG];
}

module.exports = getObj;
```

## Next Steps

* The UI could use some improvement. ;-)
    * It would be relatively easy to leverage React and some Material UI components.
    * Add more robust form validation.
    * Use [SweetAlert](https://sweetalert.js.org/) for the modal.

* Add a database backend to persist user survey results.
    * Harden the code to catch duplicate entries.
    * Maybe implement full CRUD.

* Play with other forms of measuring compatibility.

* Spend time with friends.

![alt](docs/img/helena-lopes-PGnqT0rXWLs-unsplash.jpg)
