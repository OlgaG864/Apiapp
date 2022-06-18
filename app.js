const express = require("express");
const app = express();
const http = require("http").Server(app);
const database = require("./database");

app.use(express.json());
app.use("/api/customers", customers);
app.use("/api/auth", auth);
app.use("/api/cards", cards);
const port = 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
