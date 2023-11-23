import prompts from "prompts";
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

const removeDiscountQuestions = [
  {
    type: "number",
    name: "discount_id",
    message: "Enter discount ID to remove:",
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
        const discount = await db.discount.create({ 
            discount_code: generateDiscountCode(8),
            discount_percent: discountData.discount_percentage,
            customer_id: id,
            is_redeemed: false,
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
    const { discount_id } = await prompts(removeDiscountQuestions);

    console.log("Discount removed successfully!");
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

// Main function to display options and handle user input
const main = async (database, business) => {
  const { choice } = await prompts({
    type: "select",
    name: "choice",
    message: "Choose an option:",
    choices: [
      { title: "Add Discount", value: "add" },
      { title: "Remove Discount", value: "remove" },
 //     { title: "Edit Discount", value: "edit" },
    ],
  });

  if (choice === "add") {
    await addDiscount(database, business);
  } else if (choice === "remove") {
    await removeDiscount(database, business);
  }
//  else if (choice === "edit") {
//    await updateDiscount(database, business);
//  }
}
