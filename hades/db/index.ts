import { Pool, Client } from "pg";

const PGDATABASE = "lifeplanner";
const dbConfig = { database: PGDATABASE, max: 10, idleTimeoutMillis: 30000 };
const connect = async (pgClient: Client) => await pgClient.connect();
const pool = new Pool(dbConfig);
const client = new Client(dbConfig);

connect(client);

export { pool, client };
