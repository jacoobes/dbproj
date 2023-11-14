import prompts from "prompts";
import { addCustomer } from './createcustomer.js';
export default {
  1: ({ database, business, acct }) => addCustomer(database, business),
  2: async (ctx) => {},
  3: async (ctx) => {},
};
