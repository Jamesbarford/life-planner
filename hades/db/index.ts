import * as Knex from "knex";

export const knex = Knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    database: "lifelplanner"
  },
  pool: {
    max: 5,
    min: 0
  },
  acquireConnectionTimeout: 30000
});
