import * as express from "express";
import {
  setBudget,
  getBudgetForMonth,
  amendBudgetForMonth
} from "../controllers/budget";
import { createEvent, getEvents, deleteEvent } from "../controllers/events";
export const router = express.Router();

router.post("/events", createEvent);
router.get("/events/:month", getEvents);
router.delete("/events/:id", deleteEvent);

router.get("/budget/:month", getBudgetForMonth);
router.post("/budget", setBudget);
router.patch("/budget/:id", amendBudgetForMonth);
