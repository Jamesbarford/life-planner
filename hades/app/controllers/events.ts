import { Request, Response } from "express";
import { Event } from "../types";
import { client } from "../../db";
import { success, failure, badRequest } from "../helpers/responseHandlers";

export async function createEvent(
  req: Request,
  res: Response
): Promise<Response> {
  const body = req.body as Event;
  const { id, title, date, category, description } = body;

  // Validate request
  // ===========================================================================
  if (id === "") return badRequest(res, "Invalid id for event");

  try {
    const request = await client.query(`
      INSERT INTO events(
        id,
        title,
        date,
        category,
        description
      )
      VALUES(
        '${id}',
        '${title}',
        '${date}',
        '${category}',
        '${description}'
      );
    `);
    return success(res, body, "succesfully created event");
  } catch (err) {
    return failure(res, "failed to create event");
  }
}

export async function getEvents(req: Request, res: Response) {
  try {
    const request = await client.query(`SELECT * FROM events`);
    return success<Array<Event>>(res, request.rows, "fetch success");
  } catch (err) {
    return failure(res, "failed to fetch events");
  }
}
