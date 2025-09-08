import { Router } from "express";
import { allEvents, upcomingEvents } from "../controllers/event.controller.js";


const router = Router();

router.route("/").get(allEvents);
router.route("/upcoming").get(upcomingEvents)

export default router;