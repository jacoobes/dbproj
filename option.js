import { manageCustomers } from "./createcustomer.js";
import { manageDiscounts } from "./creatediscount.js";
export default {
  1: async ({ database, business }) => manageCustomers(database, business),
  2: async ({ database, business }) => manageDiscounts(database, business),
};
