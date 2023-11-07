export default (db) => ({
  create: (cp) => {
    return db
      .insertInto("customer")
      .values(cp)
      .returningAll()
      .executeTakeFirstOrThrow();
  },
  associate: (customer_id, source_id) => {
    return db
      .insertInto("customer_source")
      .values({ customer_id, source_id })
      .returningAll()
      .executeTakeFirstOrThrow();
  },
  get: async (id) => {
    return db
      .selectFrom("customer")
      .where("customer_id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();
  },
});
