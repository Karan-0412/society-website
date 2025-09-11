import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        default: "Guest"
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: false
    },
    universityName:{
        type: String,
        required: true,
        default: "Chanidigarh University"
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);