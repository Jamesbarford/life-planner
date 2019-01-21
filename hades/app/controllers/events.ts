import * as Express from "express";
import { Event } from "../types";
import { knex } from "../../db";

export function createEvent(
  req: Express.Request,
  res: Express.Response
): void | Express.Response {
  const body = req.body as Event;
  const { id, title, date, category, description } = body;

  // Validate request
  // ===========================================================================
  if (id === "") return res.send({ status: 400, body: "invalid event" });

  knex
    .raw(
      `
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
        '${description}',
      );
  `
    )
    .then(() => res.send({ status: 200, body: "succesfull creation" }))
    .catch(err => res.send({ status: 500, body: err }));
}
