const mongoose = require("mongoose");

const liveSessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    telegramLink: {
        type: String,
        required: true,
    },
    isLive: {
        type: Boolean,
        default: false, // Indique si la session est en direct
    },
}, {
    versionKey: false,
});

const LiveSessionModel = mongoose.model("LiveSession", liveSessionSchema);

module.exports = {
    LiveSessionModel,

};
