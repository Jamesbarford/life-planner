import * as express from "express";
import * as bunyan from "bunyan";
import * as bunyanRequest from "bunyan-request";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as pg from "pg";
import { router } from "./app/routes/events";

import { AddressInfo } from "net";

const PGDATABASE = "mailgun";
const app = express();

const dbConfig = {
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};
const log = bunyan.createLogger({ name: "Mail Gun" });
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

const pool = new pg.Pool(dbConfig);

pool.connect((err, client, done) => {
  if (err) {
    console.log(err);
  }
  app.listen(3002, () => {
    console.log("Db is listening on 3002");
  });
});

export default app;
