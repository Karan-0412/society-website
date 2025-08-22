import { Router } from "express";
import { allEvents } from "../controllers/event.controller.js";

const router = Router();

router.route("/").get(allEvents);

export default router;