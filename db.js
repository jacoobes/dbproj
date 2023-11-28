import CustomerManager from "./customer_manager.js";
import BusinessManager from "./business_manager.js";
import BusinessUserManager from "./business_user_manager.js";
import LocationManager from "./location_manager.js";
import DiscountManager from './discount_manager.js'
import Database from "better-sqlite3";
import { SqliteDialect, Kysely } from "kysely";
import { readFile } from "node:fs/promises";

export const initiate = async (database_location) => {
  const __sqlitedb = new Database(database_location);
  const db = new Kysely({
    dialect: new SqliteDialect({
      database: __sqlitedb,
    }),
  });
  await createTables(__sqlitedb);
  return {
    customer: CustomerManager(db),
    business: BusinessManager(db),
    business_user: BusinessUserManager(db),
    location: LocationManager(db),
    discount: DiscountManager(db),
    destroy: () => db.destroy(),
  };
};

const createTables = async (db) => {
  const init_tables = await readFile("./sql/create_tables.sql", "utf8");

  const stmts = init_tables
    .split("--DO NOT TOUCH THIS LINE\n")
    .map((sql) => db.prepare(sql));

  const create_all = db.transaction(() => {
    for (const stmt of stmts) {
      stmt.run();
    }
  });
  create_all();

  
};
