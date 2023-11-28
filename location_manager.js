export default (db) => ({
  //latitude = number, longitude = number
  create: async (loc) => {
    return db
      .insertInto("location")
      .values(loc)
      .returningAll()
      .executeTakeFirst();
  },
  get: (location_id) => {
    return db
      .selectFrom("location")
      .where("location_id", "=", location_id)
      .selectAll()
      .executeTakeFirstOrThrow();
  },
});
