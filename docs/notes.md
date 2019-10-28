# Node server cheat sheet ...

## Create an http server
```
    var http = require("http");
    var server = http.createServer(handleRequestCB);
    server.listen(
        8080,  // port number
        function() {
            console.log("Server is listening on PORT: " + PORT);
        }
    );
```

## Grab url from client
```
    var path = req.url;
    // do something with path ... serve up some html
    fs.readFile(__dirname + path, (err, data) => {})

    OR

    var path = require("path");
    res.sendFile(path.join(__dirname, "view.html"));
```

## Filling a data buffer with html from a file:
```
    var fs = require("fs");

    fs.readFile(
	__dirname + "/filename.html", 
	function(err, data) {
      		if (err) throw err;
      		// data buffer full
      		...
    	}
    );
```

## Pushing html buffer to the client
```
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
```

## Get posted data from client
```
    # On client side
    ----------------------------------------------------------
    <form action="http://localhost:8080/postData" method="POST">
        <input name="name" placeholder="enter your name">
        <input name="band" placeholder="enter your favorite band">
        <button type='submit'>submit</button>
    </form>
    ----------------------------------------------------------

    # On server side
    ----------------------------------------------------------
    function handleRequest(req, res) {
        var path=req.url
        switch (path) {
            case "/postData":
                return handlePostedData(req, res)
            ...
            default:
                display404(path, res);

        }

    function handlePostedData(req, res) {
       var reqData = "";
       var theHtml = "";

       req.on("data", 
              (data) => {
                  // save data on the server-side ...
                  reqData += data;

                  // form some html
                  //theHtml = ...                  
              }
       )

       req.on("end", 
              () => {
                  ..
                  // do something with reqData
                  res.end();

                  // or send down formed html
                  res.writeHead(200, {"Content-Type": "text/html"});
                  res.end(theHtml);
              }
       )
    }
```

## Send a string to the client
```
    res.send("Welcome to my world of strings");
```

## Creating a server using express package...
```
    var express = require("express");
    var app = express();
    app.get(path, (req, res) => {
            res.send(...);
            res.end();
        }
    );
    ...
    app.listen(PORT, () => { console.log("listenting on port ", PORT); }
```

## Sending down json api to client
```
    var blahJson = { .. };
    app.get("/api/blah", (req, res) => {
        return res.json(blahJson);
    }
```

## Getting GET query string param from client:
```
    var characters = [{}, {}, {}];
    app.get("/api/characters/:character", (req, res) => {
        var character = req.params.character;
        // possibly returning
        return res.json(characters[i])
        // or
        return res.end("No character found");
    }
```

## Using express middleware to handle incoming data parsing of json from client
```
    var express = require("express");

    var app = express();
    var PORT = 3000;

    // Sets up the Express app to handle data parsing
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    ...
    
    app.post("/api/characters, (req, res) => {
        var newCharacter = req.body;
	characters.push(newCharacter);
        res.json(newCharacter);
    });
```

## Returning json stuff to client ...
```
    res.json(false); // is a thing
    res.json({ ok: true });
    res.json(true);
```

## *.res things
```
    res.sendFile(path.join(__dirname, "view.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
    res.end();
    res.json(blahJson);
    res.end("No character found");
    res.redirect("/pages/home");
```

## some regex fu
```
    # strip spaces from character name
    var blah = newCharacter.name.replace(/\s+/g, "").toLowerCase();
```

## app. stuff
```
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    var express = require("express");
    var app = express();
    app.get(path, (req, res) => {
            res.send(...);
            res.end();
        }
    );

    app.post("/api/characters, (req, res) => {
        var newCharacter = req.body;
	    characters.push(newCharacter);
        res.json(newCharacter);
    });

    app.listen(PORT, () => { console.log("listenting on port ", PORT); }
```

## express pattern in 10 lines ... rather beautiful
```
    var express = require("express");
    var app = express();
    var PORT = process.env.PORT || 8080;
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    require("./routes/apiRoutes")(app);
    require("./routes/htmlRoutes")(app);
    app.listen(PORT, function() {
      console.log("App listening on PORT: " + PORT);
    });
```

## dir structure
```
    data/*.js (instead of db)
    public/*.html
    routes/apiRoutes.js

        module.exports = function(app) {
              app.get("/api/tables", function(req, res) {
                  res.json(tableData);
              }
              ..
        }

    routes/htmlRoutes.js

        module.exports = function(app) {
          app.get("/tables", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/tables.html"));
          });

          app.get(..)
        };
```

## Put your static content outside your app src tree for security
```
    root/
        /static/data
        /app/handlers
            /node_modules
            /server.js
                ..
                app.use(express.static(__dirname + "/../static");
                ..
```

## Redirect to default path
```
    app.get("/", 
            (req, res) => {
                res.redirect("/pages/home");
                res.end();
            }
    );
```