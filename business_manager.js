export default (db) => ({
  //Business {
  //    business_id: number
  //    business_name: string
  //    brand: string
  //    address: string
  //    city: string
  //    country: string
  //    source_id: number
  //    password: string;
  //    faq_id: number | null
  //    location_id: number
  //}
  create: (bp) => {
    return db
      .insertInto("business")
      .values(bp)
      .returningAll()
      .executeTakeFirst();
  },
  get_all: () => {
    return db.selectFrom("business").selectAll().execute();
  },
  update: async (id, bp) => {
    return (
      db
        .updateTable("business")
        .where("business_id", "=", id)
        .set({
          ...bp,
        })
        .executeTakeFirst() !== undefined
    );
  },

  find_by_name: (name) => {
    return db
      .selectFrom("business")
      .where("business_name", "=", name)
      .selectAll()
      .executeTakeFirst();
  },
  get: async (id) => {
    return db
      .selectFrom("business")
      .where("business_id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();
  },

});
