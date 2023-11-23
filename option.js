import prompts from "prompts";
import { addCustomer, removeCustomer, viewCustomers } from './createcustomer.js';
export default {
  1: async ({ database, business, }) => addCustomer(database, business),
  2: async ({ database, business }) => removeCustomer(database, business),
  3: async ({ database, business }) => viewCustomers(database, business),
};
