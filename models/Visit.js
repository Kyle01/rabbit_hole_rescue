const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
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
    required: true
  },
  children: [
    {
      type: Number,
      // ref: "visits",
      required: true
    },
  ],
  timeCreated: {
    type: Date,
    default: new Date()
  }
});

module.exports = Visit = mongoose.model("visit", VisitSchema);
