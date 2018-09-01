const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
router.get('/test', (req, res) => {
    console.log("hello world")
})

router.post('/', (req, res) => {
    const newVisit = new Visit({
        title: req.body.title,
        url: req.body.url,
        chromeTabId: req.body.chromeTabId,
        chromeWindowId: req.body.chromeWindowId,
        parent: req.body.parent,
        // children: req.body.children,
        timeCreated: req.body.timeCreated
    });

    newVisit.save()
        .then(visit => res.json(visit))
        .catch(err => console.log(err));
})


module.exports = router;