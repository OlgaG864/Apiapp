const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards");

router.get("/cards", (req, res) => {
  res.send("<h1>Cards page</h1>");
});

router.post("/", cards.addCard);
router.get("/:id", cards.findCard);
router.put("/:id", cards.setCard);
router.delete("/:id", cards.deleteCard);

module.exports = router;
