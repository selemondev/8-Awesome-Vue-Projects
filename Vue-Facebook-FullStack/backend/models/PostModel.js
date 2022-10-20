const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    likes: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("PostSchema", PostSchema);