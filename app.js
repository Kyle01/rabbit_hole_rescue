
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
    
const port = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("Hello World 2"));
app.listen(port, () => console.log(`Server is running on port ${port}`));