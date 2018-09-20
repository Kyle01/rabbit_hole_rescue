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
    type: String,
    required: false
  },
  children: [
    {
      type: String,
      required: false
    }
  ],
  username: {
    type: Schema.Types.String,
    ref: "users"
  },
  timeCreated: {
    type: Date,
    default: new Date()
  }
});

module.exports = Visit = mongoose.model("visit", VisitSchema);
