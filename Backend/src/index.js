import { app } from "./app.js";
import { connectDB } from "./DB/connectDB.js";

connectDB()
.then(()=>{
    app.on(error, (error)=>{
        console.log(`ERROR1: ${error}`);
    })
    app.listen(process.env.PORT, ()=>{
    console.log(`The server is running on port ${process.env.PORT}`);
})
})
.catch(()=>{
    console.log(`Error while connecting to the database.`);
})