
const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");

router.get("/", (req, res, next) => {
    res.send("APP IS WORKING!!!")
})

module.exports = router;
