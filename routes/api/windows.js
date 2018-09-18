const express = require("express");
const router = express.Router();
const Window = require("../../models/Window");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.get('/:username', (req, res) => {
    debugger;
    Window.find({"username": req.params.username})
        .then(windows => {
            res.json({
                success: true,
                windows
            });
        })
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

router.patch('/update', (req, res) => {
    Window.findOne({id: req.body.id})
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