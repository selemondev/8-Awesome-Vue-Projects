import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Todo", schema)