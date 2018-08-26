
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
    
const port = process.env.PORT || 5000;


app.use(passport.initialize());
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use("/api/users", users);
