
export const exit = (code) => () => process.exit(code);


export const readSqlAndInit= async (db, arr) => {
  const stmts = arr
    .map((sql) => db.prepare(sql));

  const create_all = db.transaction(() => {
    for (const stmt of stmts) {
      stmt.run();
    }
  });

  create_all();
  
}
