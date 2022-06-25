const express = require("express");
const router = express.Router();
const regCustomer = require("../controllers/register");

router.get("/register", (req, res) => {
  res.send("<h1>Register for new customer or sigh in </h1>");
});

router.post("/", regCustomer.addCustomer);

module.exports = router;
