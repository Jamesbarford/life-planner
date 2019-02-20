import * as moment from "moment";
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
    await client.query(`
      INSERT INTO events(
        id,
        title,
        date,
        category,
        description,
        time
      )
      VALUES(
        '${id}',
        '${title}',
        '${moment(date).format("YYYY-MM-DD")}',
        '${category}',
        '${description}',
        '${moment(date).format("HH:mm:SS")}'
      );
    `);
    return success(res, body, "succesfully created event");
  } catch (err) {
    return failure(res, "failed to create event");
  }
}

export async function getEvents(req: Request, res: Response) {
  try {
    const month = req.params.month;
    const request = await client.query(`
      SELECT * FROM events
      WHERE
      EXTRACT (MONTH FROM date) = ${parseInt(month) + 1};
    `);
    return success<Array<Event>>(res, request.rows, "fetch success");
  } catch (err) {
    return failure(res, "failed to fetch events");
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await client.query(`
      DELETE FROM events
      WHERE id = '${id}';
    `);
    return success(res, { id }, "successfuly deleted event");
  } catch (err) {
    return failure(res, "failed to delete event");
  }
}
