import { readFile } from 'fs/promises'
import { EOL } from 'os';

export const exit = (code) => () => process.exit(code);


export const readSqlAndInit= async (db, filepath) => {
  const init_tables = await readFile(filepath, "utf8");
  const stmts = init_tables
    .split("--DO NOT TOUCH THIS LINE"+EOL)
    .map((sql) => db.prepare(sql));

  const create_all = db.transaction(() => {
    for (const stmt of stmts) {
      stmt.run();
    }
  });

  create_all();
  
}
