import * as express from "express";
import * as bunyan from "bunyan";
import * as bunyanRequest from "bunyan-request";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { AddressInfo } from "net";
import { router } from "./app/routes/events";
import { pool } from "./db";

const app = express();

const log = bunyan.createLogger({ name: "Life Planner" });
const requestLogger = bunyanRequest({
  logger: log,
  headerName: "x-request-id"
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use("/api", router);

const server = app.listen(8000, () => {
  const serverInfo = server.address() as AddressInfo;
  const host = serverInfo.address;
  const port = serverInfo.port;

  log.info(`calendar is listening on http:${host}:${port}`);
});

pool.connect((err, client, done) => {
  if (err) {
    console.log(err);
  }
  app.listen(3002, () => {
    console.log("Db is listening on 3002");
  });
});

export default app;
