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
    required: true
  },
  children: [
    {
      type: Number,
      required: true
    }
  ],
  username: {
    type: Schema.Types.String,
    ref: "users"
  },
  timeCreated: {
    type: Date,
    required: false
  }
});

module.exports = Visit = mongoose.model("visit", VisitSchema);
