const express = require("express");
const customers = require("../models/customers");

const router = express.Router();

router.post("/", customers.addCustomer);
router.get("/", customers.findCustomer);

module.exports = router;
