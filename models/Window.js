const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WindowSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    visits: [
        {
            // type: Object.Type.ObjectId,
            // ref: "visits"
            type: Number,
            required: false
        }
    ],
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Window = mongoose.model("window", WindowSchema);