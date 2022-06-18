const express = require("express");
const _ = require("lodash");
const { Card, validateCard } = require("../models/card");
const cm = require("../models/cards");
const router = express.Router();

router.post("/", cm.addCard);

module.exports = router;
