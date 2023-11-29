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
  get_all: (business_id) => {
    return db
      .selectFrom('location')
      .where('business_id', '=', business_id)
      .selectAll()
      .execute()
  },
  delete: (loc_id) => {
    return db
      .deleteFrom('location')
      .where('location_id', '=', loc_id)
      .executeTakeFirst()

  }
});
