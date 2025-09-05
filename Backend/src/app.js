import express from "express"
import registerationRouter from "./routes/registeration.route.js";
import eventRouter from "./routes/event.route.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors"

export const app = express();


// MIDDLEWARES

app.use(express.json());
app.use(cors());


//ROUTES

app.use("/register/:slug", registerationRouter);
app.use("/events",eventRouter);
app.use("/contact", messageRouter);
