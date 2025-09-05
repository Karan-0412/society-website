import { Registeration } from "../models/registeration.model.js"

export const registerTeam = async (req, res) =>{
    try{
        const data=req.body;
        const newTeam = new Registeration(data);
        const registered=await newTeam.save();
        res.status(400).json(registered);
    }catch(error){
        console.log(`ERROR while registering team: ${error}`);
        res.status(500).json({
            message:`Something went wrong when registering your team, Try Again!!`
        })
    }
}