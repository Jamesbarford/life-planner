import * as express from "express";
import { createEvent, getEvents } from "../controllers/events";
export const router = express.Router();

router.post("/events", createEvent);
router.get("/events/:month", getEvents);
