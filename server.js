const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const APP_NAME = "Doppelganger"

// Configure server for incoming posted json in req.body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/htmlRoutes")(app)
require("./app/routing/jsonRoutes")(app)

app.listen(PORT, () => {
    console.log(`${APP_NAME} server listening on port ${PORT}`);
})