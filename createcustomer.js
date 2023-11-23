import prompts from "prompts";
import { exit } from "./tools.js";
export { main as manageCustomers };

const addCustomerQuestions = [
  {
    type: "text",
    name: "name",
    message: "enter customer name:",
  },
  {
    type: "text",
    name: "phone_number",
    message: "enter customer phone number:",
    //https://stackoverflow.com/a/29767609/14709144
    validate: (input) =>
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(input),
  },
];

// Function to add a customer to the database
const addCustomer = async (db, business) => {
  try {
    const customerData = await prompts(addCustomerQuestions);
    //
    // business_id INTEGER REFERENCES business(business_id),
    // name VARCHAR,
    // join_date VARCHAR,
    // phone_number INTEGER

    await db.customer.create({
      name: customerData.name,
      phone_number: customerData.phone_number,
      join_date: new Date().toISOString(),
      business_id: business.business_id,
    });

    console.log("Customer added successfully!");
  } catch (error) {
    console.error("Error adding customer:", error);

    db.close();
  }
};

// Function to remove a customer from the database
const removeCustomer = async (db, business) => {
  const all_customers = await db.customer.get_all_from_business(
    business.business_id,
  );
  if (all_customers.length == 0) {
    console.log("No customers to delete! Returning");
    return;
  }
  const customers = await prompts(
    {
      type: "autocomplete",
      name: "ci_id",
      message: "remove customers",
      required: true,
      choices: all_customers.map((data) => ({
        title: data.name + ", " + data.phone_number,
        value: data.customer_id,
      })),
    },
    {
      onCancel: exit(1),
    },
  );
  try {
    await db.customer.delete(customers.ci_id);
    console.log("Customer removed successfully!");
  } catch (error) {
    console.error("Error removing customer:", error);
    db.close();
  }
};

const viewCustomers = async (db, business) => {
  const customers = await db.customer.get_all_from_business(
    business.business_id,
  );
  if (customers.length == 0) {
    console.log("No customers to show. Get busy");
    return;
  }
  customers.forEach((customer) =>
    console.log(JSON.stringify(customer, "business_id", 3)),
  );
};

const main = async (database, business) => {
  const { choice } = await prompts({
    type: "select",
    name: "choice",
    message: "Choose an option:",
    choices: [
      { title: "Add Customer", value: "add" },
      { title: "Remove Customer", value: "remove" },
      { title: "View Customers", value: "view" },
    ],
  });

  if (choice === "add") {
    await addCustomer(database, business);
  } else if (choice === "remove") {
    await removeCustomer(database, business);
  } else if (choice === "view") {
    await viewCustomers(database, business);
  }
};
