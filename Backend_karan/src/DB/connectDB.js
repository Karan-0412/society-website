import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

export const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`The connection with theDB is established ${connectionInstance.connection.host}`);
        console.log(`The connection with theDB is established ${connectionInstance.connection.name}`);
    }
    catch(error){
        console.log("Trouble when connecting with the DB");
    }
}