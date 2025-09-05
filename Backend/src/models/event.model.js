import mongoose, { Schema } from "mongoose";

const eventSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type:Date,
        required:true 
    },
    location:{
        type: String,
        required: true
    },
    attendance:{
        type: Number,
        required: true,
        default:0
    },
    category: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "Open"
    },
    description: {
        type: String,
        required: true
    },
    participants:{
        type: Number,
        required: true,
        max:[4, "Maximum 4 members allowed"]
        
    }
}, {timestamps: true})

const Event = mongoose.model("Event", eventSchema);

export default Event;