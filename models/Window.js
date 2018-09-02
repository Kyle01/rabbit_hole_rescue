const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WindowSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    visits: [
        {
            type: Object.Type.ObjectId,
            ref: "visits"
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Window = mongoose.model("window", WindowSchema);