const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WindowSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    visits: [
        {
            type: Schema.Types.ObjectId,
            ref: "visits"
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