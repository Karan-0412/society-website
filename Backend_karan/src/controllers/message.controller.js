import Message from"../models/message.model.js"

export const sendMessage = async (req, res)=>{
    try {
        const message=req.body;
        const newMessage=new Message(message);
        const contact = await newMessage.save()
        res.status(200).json(contact)

    } catch (error) {
        console.log("ERROR while sending the message")
        res.status(500).json(error)
    }
}