const express = require("express");
const router = express.Router();
const Window = require("../../models/Window");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.get('/:username', (req, res) => {
    Window.find({"username": req.params.username})
        .then(windows => {
            res.json({
                success: true,
                windows
            });
        })
        .catch(err => console.log(err));
})

router.get('/:username/:windowId', (req, res) => {
    Window.findOne({id: req.params.windowId, username: req.params.username})
        .then(window => {
            res.json({
                success: true,
                window
            });
        })
        .catch(err => console.log(err));
})

router.post('/', (req, res) => {
    Window.findOne({id: req.body.id})
        .then(window => {
            if (!window) {
                const newWindow = new Window ({
                    id: req.body.id,
                    visits: req.body.visits,
                    username: req.body.username
                });

                newWindow.save()
                    .then(window => res.json(window))  
                    .catch(err => console.log(err));
            }
        })
})

router.patch(':username/update', (req, res) => {
    //username too
    Window.findOne({id: req.body.id, username: req.params.username})
        .then(window => {
            if (window) {
                if (!window.visits.includes(req.body.visits)) {
                    window.visits.push(req.body.visits);
                }
                window.save()
                    .then(window => res.json(window))
                    .catch(err => console.log(err));
            }
        })
})

module.exports = router;