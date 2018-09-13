const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WindowSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    visits: [
        {
            type: Number,
<<<<<<< HEAD
            required: false
=======
            required: true
>>>>>>> dbd977fc71466c83aee801812a5256d371fdb78e
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