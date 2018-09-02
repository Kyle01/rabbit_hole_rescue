const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.get("/test", (req, res) => {
  console.log("hello world");
});

router.post('/', (req, res) => {
    Window.findOne({id: req.body.id})
        .then(window => {
            if (!window) {
                const newWindow = new Window ({
                    id: req.body.id,
                    visits: req.body.visits
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