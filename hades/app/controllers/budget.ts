import * as moment from "moment";
import { isEmpty } from "lodash";
import { Request, Response } from "express";
import { client } from "../../db";
import { RequestHandler } from "../helpers/responseHandlers";
import { Budget } from "../types";

export async function setBudget(
  req: Request,
  res: Response
): Promise<Response> {
  const body = req.body as Budget;
  const { id, amount } = body;
  const date = moment(body.date);
  const todaysMonth = moment()
    .startOf("day")
    .month();
  const requestedMonth = moment(body.date)
    .startOf("day")
    .month();

  let _dateFormatted: string;

  if (todaysMonth !== requestedMonth) {
    _dateFormatted = date.startOf("month").format("YYYY-MM-DD");
  } else {
    _dateFormatted = date.format("YYYY-MM-DD");
  }

  try {
    await client.query(`
      INSERT INTO budget(
        id,
        month,
        amount
      )
      VALUES(
        '${id}',
        '${_dateFormatted}',
        '${amount}'
      )
    `);
    return RequestHandler.success(res, body, "succesfully added budget");
  } catch (error) {
    return RequestHandler.failure(res, "failed to set budget");
  }
}

export async function getBudgetForMonth(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const month = req.params.month;
    const request = await client.query(`
      SELECT * FROM budget
      WHERE
      EXTRACT (MONTH FROM month) = ${parseInt(month) + 1};
    `);

    const response = request.rows[0];
    if (isEmpty(response))
      return RequestHandler.success(res, {}, "fetch success");

    const body = {
      id: response.id,
      amount: response.amount,
      date: response.month
    };
    return RequestHandler.success<Budget>(res, body, "fetch success");
  } catch (err) {
    return RequestHandler.failure(res, "failed to fetch budget");
  }
}

export async function amendBudgetForMonth(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { budget } = req.body;
    const request = await client.query(`
      UPDATE budget
      SET amount = ${budget}
      WHERE id = '${id}';

      SELECT * FROM budget
      WHERE id = '${id}';
    `);
    return RequestHandler.success<Budget>(
      res,
      request[1].rows[0],
      "succesfully amended budget"
    );
  } catch (err) {
    return RequestHandler.failure(res, "failed to amend budget");
  }
}
