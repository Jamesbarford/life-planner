import * as moment from "moment";
import { Request, Response } from "express";
import { client } from "../../db";
import { success, failure } from "../helpers/responseHandlers";
import { Budget } from "../types";

export async function setBudget(
  req: Request,
  res: Response
): Promise<Response> {
  const body = req.body as Budget;
  const { id, date, amount } = body;

  try {
    await client.query(`
      INSERT INTO budget(
        id,
        month,
        amount
      )
      VALUES(
        '${id}',
        '${moment(date).format("YYYY-MM-DD")}',
        '${amount}'
      )
    `);
    return success(res, body, "succesfully added budget");
  } catch (error) {
    return failure(res, "failed to set budget");
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
      EXTRACT (MONTH FROM month) = ${month + 1};
    `);
    return success<Budget>(res, request.rows[0], "fetch success");
  } catch (err) {
    return failure(res, "failed to fetch budget");
  }
}
