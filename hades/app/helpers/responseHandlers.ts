import { Response } from "express";

export class RequestHandler {
  public static success<T>(res: Response, body: T, msg: string) {
    return res.send({ statusCode: 200, body, response: msg, success: true });
  }

  public static failure(res: Response, msg: string) {
    return res.send({
      statusCode: 500,
      body: {},
      response: msg,
      success: false
    });
  }

  public static badRequest(res: Response, msg: string) {
    return res.send({
      statusCode: 400,
      body: {},
      response: msg,
      success: false
    });
  }
}
