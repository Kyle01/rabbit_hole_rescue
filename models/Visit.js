const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  chromeTabId: {
    type: Number,
    required: true
  },
  chromeWindowId: {
    type: Number,
    required: true
  },
  parent: {
    type: Number,
    // ref: "visits",
    required: false
  },
  children: [
    {
      type: Number,
      // ref: "visits",
      required: false
    },
  ],
  username: {
    type: String,
    required: true
  },
  timeCreated: {
    type: Date,
    required: false
  }
});

module.exports = Visit = mongoose.model("visit", VisitSchema);
