const express = require("express");
const app = express();
const auth = require("./middleware/auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var customersRouter = require("./routes/cusromers");
var cardsRouter = require("./routes/cards");
var registerRouter = require("./routes/register");

//define routs

app.use("/", indexRouter);
app.use("/", registerRouter);
app.use("/users", auth, usersRouter);
app.use("/customers", auth, customersRouter);
app.use("/cards", auth, cardsRouter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
