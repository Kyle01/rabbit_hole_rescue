const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.get('/:windowId', (req, res) => {
    Visit.find({"chromeWindowId": req.params.windowId})
        .then(visits => {
            res.json({
                success: true,
                visits
            });
        })
        .catch(err => console.log(err));
})

router.get(`/:username/:chromeWindowId/:chromeTabId/:url`, (req, res) => {
    Visit.findOne({
        username: req.params.username,
        chromeWindowId: req.params.chromeWindowId, 
        chromeTabId: req.params.chromeTabId, 
        url: req.params.url
    })
        .then(visit => {
            res.json({
                success: true,
                visit
            })
        })
        .catch(err => console.log(err));
})

router.post('/', (req, res) => {
    Visit.findOne({url: req.body.url, chromeTabId: req.body.chromeTabId})
        .then (visit => {
            if (!visit) {
                console.log("you are making a visit");
                const newVisit = new Visit({
                    title: req.body.title,
                    url: req.body.url,
                    chromeTabId: req.body.chromeTabId,
                    chromeWindowId: req.body.chromeWindowId,
                    parent: req.body.parent,
                    children: req.body.children,
                    username: req.body.username
                });

                newVisit.save()
                    .then(visit => res.json(visit))
                    .catch(err => console.log(err));
            }
        }

    )
})

router.patch('/update', (req, res) => {
    Visit.findOne({id: req.body.id})
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