import { Request, Response } from "express";
import { Event } from "../types";
import { client } from "../../db";

export async function createEvent(
  req: Request,
  res: Response
): Promise<Response> {
  const body = req.body as Event;
  const { id, title, date, category, description } = body;

  // Validate request
  // ===========================================================================
  if (id === "") return res.send({ status: 400, body: "invalid event" });

  try {
    await client.query(`
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
    return res.send({ status: 200, body: "successful creation" });
  } catch (err) {
    return res.send({ statusCode: 500, body: "failed to create event" });
  }
}
