const express = require("express");
const router = express.Router();

const cm = require("../controllers/customers");

router.get("/customers", (req, res) => {
  res.send("<h1>Customers page</h1>");
});

router.get("/", cm.findCustomer);
router.get("/", cm.findCustomer);
router.get("/", cm.cardsList);
//router.delete("/customers", cm.deleteCustomer);

module.exports = router;
