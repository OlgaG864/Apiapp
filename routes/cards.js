const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards");

router.get("/cards", (req, res) => {
  res.send("<h1>Cards page</h1>");
});

router.post("/", cards.addCard);
router.get("/", cards.findCard);
router.put("/", cards.setCard);

module.exports = router;
