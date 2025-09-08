import Event from "../models/event.model.js"

export const allEvents = async(req, res)=>{
    try {
        const events = await Event.find({});
        if(!events || events.length===0)
            res.status(404).json({
            message: "Cannot fetch the events"
        });
        
        res.status(200).json(events)
    } catch (error) {
        console.log(`ERROR while fetching events : ${error}`)
        
    }
}

export const upcomingEvents = async (req, res)=>{
    try {
        const upcomingEvents=await Event.find({status: "Open"})
        if(upcomingEvents.length===0 || !upcomingEvents){
            res.status(404).json({
                message: "No Upcoming Events right now"
            })
        }
        res.status(200).json(upcomingEvents)
    } catch (error) {
        console.log(`ERROR while fetching upcoming Events ${error}`)
    }
}