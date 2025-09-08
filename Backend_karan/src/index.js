import { app } from "./app.js";
import { connectDB } from "./DB/connectDB.js";

connectDB()
.then(()=>{
    app.on("error", (error)=>{
        console.log(`ERROR1: ${error}`);
    })
    app.listen(5000 ,()=>{
    console.log(`The server is running on port 5000`);
})
})
.catch(()=>{
    console.log(`Error while connecting to the database.`);
})