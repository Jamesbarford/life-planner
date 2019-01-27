import * as express from "express";
import { setBudget, getBudgetForMonth } from "../controllers/budget";
import { createEvent, getEvents } from "../controllers/events";
export const router = express.Router();

router.post("/events", createEvent);
router.get("/events/:month", getEvents);

router.get("/budget/:month", getBudgetForMonth);
router.post("/budget", setBudget);
