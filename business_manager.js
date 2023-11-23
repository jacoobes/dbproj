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

  //Given a business id, we aggregate all related data of customers.
  // we can have multiple first, last, email, phone numbers. so im aggregating
  // similar data into a field and returning a customer.
  // In postgres we can use arrays, so we might need to switch to aggregating function
  get_customers: async (id) => {
    //Could maybe be optimized/
    return (
      db
        .selectFrom("customer")
        .where("customer.business_id", "=", id)
        .innerJoin(
          "customer_email",
          "customer_email.customer_id",
          "customer.customer_id",
        )
        .innerJoin(
          "customer_phone_number",
          "customer_phone_number.customer_id",
          "customer.customer_id",
        )
        .innerJoin(
          "customer_first_name",
          "customer_first_name.customer_id",
          "customer.customer_id",
        )
        .innerJoin(
          "customer_last_name",
          "customer_last_name.customer_id",
          "customer.customer_id",
        )
        //group concat is for sqlite only. will need to aggregate into postgres sql arrays once we transition
        // or, make this whole query better
        .select(({ fn }) => [
          fn.agg <
            string >
            ("group_concat", ["customer_first_name.first_name"])
              .distinct()
              .as("first_name"),
          fn.agg <
            string >
            ("group_concat", ["customer_last_name.last_name"])
              .distinct()
              .as("last_name"),
          fn.agg <
            string >
            ("group_concat", ["customer_email.email"]).distinct().as("email"),
          fn.agg <
            string >
            ("group_concat", ["customer_phone_number.phone_number"])
              .distinct()
              .as("phone_number"),
          "customer.customer_id",
          "customer.join_date",
          "customer.business_id",
        ])
        .groupBy("customer.customer_id")
        .execute()
    );
  },
});
