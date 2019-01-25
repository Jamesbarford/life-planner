import { Response } from "express";

export function success<T>(res: Response, body: T, msg: string) {
  return res.send({ statusCode: 200, body, response: msg, success: true });
}

export function failure(res: Response, msg: string) {
  return res.send({ statusCode: 500, body: {}, response: msg, success: false });
}

export function badRequest(res: Response, msg: string) {
  return res.send({ statusCode: 400, body: {}, response: msg, success: false });
}
