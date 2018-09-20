const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.get('/:windowId', (req, res) => {
    Visit.find({chromeWindowId: req.params.windowId})
        .then(visits => {
            if (visits) {
                res.json({
                    success: true,
                    visits
                });
            } else {
                res.json({
                    success: false,
                    visits: null
                })
            }
            
        })
        .catch(err => console.log(err));
})

router.get(`/:username/:chromeWindowId/:chromeTabId/:url`, (req, res) => {
    console.log("YOU ARE IN VISITS");
    Visit.findOne({
        username: req.params.username,
        chromeWindowId: req.params.chromeWindowId, 
        chromeTabId: req.params.chromeTabId, 
        title: req.params.url
    })
        .then(visit => {
            if (visit) {
                res.json({
                    success: true,
                    visit
                })
            }
        })
        .catch(err => res.json({
            success: false,
            visit: null
        })
    );
})

router.post('/', (req, res) => {
    console.log("You're in post!")
    Visit.findOne({
        username: req.body.username, 
        url: req.body.url, 
        chromeTabId: req.body.chromeTabId, 
        chromeWindowId: req.body.chromeWindowId
    })
        .then (visit => {
            if (!visit) {
                console.log("No visit!")
                const newVisit = new Visit({
                    title: req.body.title,
                    url: req.body.url,
                    chromeTabId: req.body.chromeTabId,
                    chromeWindowId: req.body.chromeWindowId,
                    parent: req.body.parent,
                    children: req.body.children,
                    username: req.body.username
                });
                console.log(newVisit);
                newVisit.save()
                    .then(visit => res.json({
                        success: true,
                        visit
                    }))
                    .catch(err => console.log(err));
            } else {
                res.json({
                    success: false,
                    visit
                });
            }
        }

    )
})

router.put('/update', (req, res) => {
    Visit.findOne({
        username: req.body.username,
        url: req.body.url,
        chromeTabId: req.body.chromeTabId,
        chromeWindowId: req.body.chromeWindowId
    })
        .then(visit => {
            if (visit) {
                if (!visit.children.includes(req.body.children)) {
                    visit.children.push(req.body.children);
                }
                visit.save()
                    .then(visit => res.json(visit))
                    .catch(err => console.log(err));
            }
        })
        
})


module.exports = router;