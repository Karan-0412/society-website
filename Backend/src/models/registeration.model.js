import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true }
});

const registerationSchema = new Schema({
    eventName:{
        type: String,
        required: true
    },
    teamName:{
        type: String,
        required: true
    },
    leaderName:{
        type: String,
        required: true
    },
    leaderUID:{
        type: String,
        required: true
    },
    participants:{
        type: Number,
        required: true,
        max:[3, "Maximum 4 members allowed"]
    },
    members: {
    type: [memberSchema],
    required: true
    }

}, {timestamps: true})

export const Registeration = mongoose.model("Registeration", registerationSchema)