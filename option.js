import prompts from "prompts";
import { addCustomer, removeCustomer } from './createcustomer.js';
export default {
  1: ({ database, business, acct }) => addCustomer(database, business),
  2: async ({ database, business }) => removeCustomer(database, business),
  3: async (ctx) => {},
};
