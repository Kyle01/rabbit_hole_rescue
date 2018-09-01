const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
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
        .then(visit => res.json(visit));
})


module.exports = router;