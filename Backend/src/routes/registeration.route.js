import { Router } from "express";
import { registerTeam } from "../controllers/registeration.controller.js";

const router = Router();

router.route("/").post(registerTeam)

export default router;