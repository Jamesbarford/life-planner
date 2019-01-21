import * as express from "express";
import { createEvent } from "../controllers/events";
export const router = express.Router();

router.post("/events", createEvent);
