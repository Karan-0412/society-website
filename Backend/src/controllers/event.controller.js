import Event from "../models/event.model.js"

export const allEvents = async(req, res)=>{
    try {
        const events = await Event.find({});
        if(!events || events.length===0)
            res.status(404).json({
            message: "Cannot fetch the events"
        });
        
        res.status(400).json(events)
    } catch (error) {
        console.log(`ERROR while fetching events : ${error}`)
        
    }

}