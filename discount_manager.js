export default (db) => ({
  create: (dp) => {
    return db
      .insertInto("discount")
      .values(dp)
      .returningAll()
      .executeTakeFirstOrThrow();
  },
  get: async (id) => {
    return db
      .selectFrom("discount")
      .where("discount_id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();
  },
  update_discount_id: async (id, bp) => {
    return (
      db
        .updateTable("discount")
        .where("discount_id", "=", id)
        .set({
          ...bp,
        })
        .executeTakeFirst() !== undefined
    );
  },
  get_discounts_from_customer: async (customer_id) => {
     return (db.selectFrom('discount')
          .where('customer_id', '=', customer_id)
          .selectAll()
          .execute());
  },
  delete: async (id) => {
    return db
      .deleteFrom("discount")
      .where("discount_id", "=", id)
      .executeTakeFirst();
  }


  //Using customer as a template ^^^^^
  //Maybe??? vvvvv
  /*create: (bp) => {
    return db
      .insertInto("discount_table")
      .values(bp)
      .returningAll()
      .executeTakeFirst();
  },
  get_all:() => {
    return db 
      .selectFrom('discount_table')
      .selectAll()
      .execute();
  },
  update_discount_id: async (id, bp) => {
    return (
      db
        .updateTable("discount_table")
        .where("discount_id", "=", id)
        .set({
          ...bp,
        })
        .executeTakeFirst() !== undefined
    );
  },

  update_business_id: async (id, bp) => {
    return (
      db
        .updateTable("discount_table")
        .where("business_id", "=", id)
        .set({
          ...bp,
        })
        .executeTakeFirst() !== undefined
    );
  },

  find_by_business_id: (id) => {
    return db
      .selectFrom("discount_table")
      .where("business_id", "=", id)
      .selectAll()
      .executeTakeFirst();
  },
  find_by_discount_id: (id) => {
    return db
      .selectFrom("discount_table")
      .where("discount_id", "=", id)
      .selectAll()
      .executeTakeFirst();
  },
  get_b_id: async (id) => {
    return db
      .selectFrom("discount_table")
      .where("business_id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();
  },
  get_d_id: async (id) => {
    return db
      .selectFrom("discount_table")
      .where("discount_id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();
  },*/
});
