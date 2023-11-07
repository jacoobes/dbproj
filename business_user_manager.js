export default (db) => ({
  get: (id) => {
    return db
      .selectFrom("business_user")
      .where("business_user_id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();
  },
  //email == string
  get_user_by_email: (email) => {
    return db
      .selectFrom("business_user")
      .where("email", "=", email)
      .selectAll()
      .executeTakeFirstOrThrow();
  },
  get_users_from_business: (business_id) => {
    return db
      .selectFrom("business_user")
      .innerJoin(
        "business",
        "business.business_id",
        "business_user.business_id",
      )
      .where("business_user.business_id", "=", business_id)
      .selectAll()
      .execute();
  },

  create_business_user: (create_bu) => {
    return db
      .insertInto("business_user")
      .values(create_bu)
      .returningAll()
      .executeTakeFirstOrThrow();
  },
});
