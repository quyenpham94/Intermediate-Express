
const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

router.get("/", (req, res, next) => {
    res.send("APP IS WORKING!!!")
})


router.post("/register", async (req, res, next) => {
    try {

        const {username, password} = req.body;
        if(!username || !password){
            throw new ExpressError("Username and Password required", 400)
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        // save to db
        db.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING username`,
            [username, hashedPassword]);

        return res.json(results.row(0))
    } catch(e) {
        if(e.code === '23505') {
            return next (new ExpressError("Username taken. Please puck another!", 400));
        }
        return next(e)
    }
})
module.exports = router;
