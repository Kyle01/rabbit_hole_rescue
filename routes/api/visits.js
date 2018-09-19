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
    Visit.findOne({
        username: req.params.username,
        chromeWindowId: req.params.chromeWindowId, 
        chromeTabId: req.params.chromeTabId, 
        url: req.params.url
    })
        .then(visit => {
            if (visit) {
                res.json({
                    success: true,
                    visit
                })
            } else [
                res.json({
                    success: false,
                    visit: null
                })
            ]
            
        })
        .catch(err => console.log(err));
})

router.post('/', (req, res) => {
    Visit.findOne({url: req.body.url, chromeTabId: req.body.chromeTabId})
        .then (visit => {
            if (!visit) {
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