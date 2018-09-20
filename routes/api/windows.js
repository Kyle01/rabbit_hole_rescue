const express = require("express");
const router = express.Router();
const Window = require("../../models/Window");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.get('/:username', (req, res) => {
    Window.find({"username": req.params.username})
        .then(windows => {
            if (windows) {
                res.json({
                    success: true,
                    windows
                });
            } else {
                res.json({
                    success: false,
                    windows: null
                })
            }
            
        })
        //fix this in all
        .catch(err => console.log(err));
})

router.get('/:username/:windowId', (req, res) => {
    console.log("YOU ARE IN WINDOWS");
    Window.findOne({id: req.params.windowId, username: req.params.username})
        .then(window => {
            if(window) {
                res.json({
                    success: true,
                    window
                });
            } else {
                
            }
            
        })
        .catch(err => { 
            res.json({
            window: null
        });
    });
})

router.post('/', (req, res) => {
    Window.findOne({id: req.body.id, username: req.body.username})
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
            } else {
                res.json({
                    window
                });
            }
        })
})

router.put(':username/update', (req, res) => {
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