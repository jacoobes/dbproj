export default (db) => ({
  //latitude = number, longitude = number
  create: async ({latitude, longitude}) => {
    return db
      .insertInto("location")
      .values({ longitude, latitude })
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
