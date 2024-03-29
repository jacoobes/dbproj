import prompts from "prompts";
import { exit } from './tools.js'
import { search_customer_prompt } from './createcustomer.js'
export { addDiscount, main as manageDiscounts };

function generateDiscountCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let discountCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    discountCode += characters.charAt(randomIndex);
  }

  return discountCode;
}



const addDiscountQuestions = [
  {
    type: "number",
    name: "discount_percentage",
    message: "Enter discount percentage:",
    validate: (data) => Number.isInteger(data) && data < 100 && data > 0
  },
  
];

//const updateDiscountQuestions = [
//  {
//    type: "number",
//    name: "discount_id",
//    message: "Enter discount ID to update:",
//
//    type: "text",
//    name: "discount_percentage",
//    message: "Enter new discount percentage:",
//  },
//];

// Function to add a discount to the database
const addDiscount = async (db, business) => {
  try {
    const discountData = await prompts(addDiscountQuestions);
    const all_customers = await db.customer.get_all_from_business(
      business.business_id,
    );
    if(all_customers.length == 0 ) {
        console.log("Get busy. You have no customers");
        return;
    }
    const customers = await search_customer_prompt(all_customers, "select many", true);
    /**
     *
     *  discount_id INTEGER PRIMARY KEY AUTOINCREMENT,
     *  customer_id INTEGER REFERENCES customer(customer_id),
     *  discount_code VARCHAR UNIQUE, 
     *  discount_percent INTEGER,
     *  is_redeemed BOOLEAN
     */
    for(const id of customers.ci_id) {
        console.log(id)
        const discount = await db.discount.create({ 
            discount_code: generateDiscountCode(8),
            discount_percent: discountData.discount_percentage,
            customer_id: id,
            is_redeemed: 0,
        });
        console.log("Discount added successfully: ", discount);
    }
    
  } catch (error) {
    console.error("Error adding discount:", error);
  }
};

// Function to remove a customer from the database
const removeDiscount = async (db, business) => {
  try {
    const all_customers = await db.customer.get_all_from_business(
      business.business_id,
    );
    if(all_customers.length == 0 ) {
        console.clear();
        console.log("Get busy. You have no customers");
        return;
    }
    const { ci_id } = await search_customer_prompt(all_customers, "Select customer to remove from", false);
    const customer = await db.customer.get(ci_id);
    const all_selected_discounts = await db.discount.get_discounts_from_customer(ci_id);
    if(all_selected_discounts.length == 0) {
        console.clear();
        console.log("No discounts found.")
        return;
    }
    const discount_select = await prompts({
      type: "multiselect",
      name: "discounts",
      message: "pick discount(s) to delete from customer " + ci_id,
      required: true,
      choices: all_selected_discounts.map((data) => ({
          title: customer.name + ", discount code:" + data.discount_code + " for "+ data.discount_percent+"%",
          value: data.discount_id,
      })),
    },
    {
      onCancel: exit(1),
    })
    
    for(const did of discount_select.discounts) {
        await db.discount.delete(did);
    }
    console.log("Discount(s) removed successfully!");
  } catch (error) {
    console.error("Error removing discount:", error);
    db.close();
  }
};

//// Function to update a discount in the database
//const updateDiscount = async (db, business) => {
//  try {
//    const { discount_id } = await prompts(updateDiscountQuestions);
//
//    console.log("Discount updated successfully!");
//  } catch (error) {
//    console.error("Error updating discount:", error);
//    db.close();
//  } finally {
//  }
//};

const viewDiscount = async (db, business) => {
 try {
    const all_customers = await db.customer.get_all_from_business(
      business.business_id,
    );
    if(all_customers.length == 0 ) {
        console.clear();
        console.log("Get busy. You have no customers");
        return;
    }
    const { ci_id } = await search_customer_prompt(all_customers, "Select customer to view from", false);
    const all_selected_discounts = await db.discount.get_discounts_from_customer(ci_id);
    if(all_selected_discounts.length == 0) {
        console.clear();
        console.log("No discounts found.")
        return;
    }
    all_selected_discounts.forEach((customer) =>
        console.log(JSON.stringify(customer, "discount_id", 3)));
  } catch (error) {
    console.error("Error viewing discount:", error);
    db.close();
  }
   
}


// Main function to display options and handle user input
const main = async (database, business) => {
  const { choice } = await prompts({
    type: "select",
    name: "choice",
    message: "Choose an option:",
    choices: [
      { title: "Add Discount", value: "add" },
      { title: "Remove Discount", value: "remove" },
      { title: "View Discount", value: "view" }
 //     { title: "Edit Discount", value: "edit" },
    ],
  });

  if (choice === "add") {
    await addDiscount(database, business);
  } else if (choice === "remove") {
    await removeDiscount(database, business);
  } else if (choice == "view") {
    await viewDiscount(database, business);
  }
//  else if (choice === "edit") {
//    await updateDiscount(database, business);
//  }
}
