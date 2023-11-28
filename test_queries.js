import  Database from "better-sqlite3";
import { readFile } from 'fs/promises'
import { existsSync, rmSync } from "fs";

if(existsSync('./database/test.db')) {
    rmSync("./database/test.db");
}
const db = new Database('./database/test.db');
db.pragma('journal_mode = WAL');

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

await createTables(db);
console.log('Tables created successfully.');
        
const queries = [
    "INSERT INTO location (longitude, latitude) VALUES (-73.935242, 40.730610);",

    `
    INSERT INTO business (business_name, brand, address, city, country, password, location_id)
    VALUES ('Example Business', 'Example Brand', '123 Main St', 'Cityville', 'Countryland', 'secretpassword', 1);
    `,

    `
    INSERT INTO customer (business_id, name, join_date, phone_number)
    VALUES (1, 'John Doe', '2023-01-01', 1234567890);
    `,

    `
    SELECT b.business_name, b.brand, b.address, b.city, b.country, l.longitude, l.latitude
    FROM business b
    JOIN location l ON b.location_id = l.location_id;
    `,

    `
    UPDATE business_user
    SET email = 'newemail@example.com'
    WHERE business_user_id = 1;
    `,

    `
    UPDATE discount
    SET is_redeemed = true
    WHERE customer_id = 1 AND discount_id = 1;
    `,

    `
    SELECT c.name AS customer_name, d.discount_code, d.discount_percent
    FROM customer c
    JOIN discount d ON c.customer_id = d.customer_id
    WHERE d.discount_percent > 10;
    `
];

const prepped_stmts = queries.map((str) => db.prepare(str));
const run_all = db.transaction(() => {
    for (const stmt of prepped_stmts) {
      console.log('Running: ', stmt.source)
      try {
        stmt.run();
        console.log('Success!');
      } catch(e) {
        console.log("Failed with", e);
      }
    }
});     


run_all();
