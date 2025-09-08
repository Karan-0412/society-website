import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    firstName:{
        type: String, 
        required: true
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Message=mongoose.model("Message", messageSchema);

export default Message;