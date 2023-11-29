import prompts from "prompts";
import { exit } from './tools.js'
import { search_customer_prompt } from './createcustomer.js'
export { addLocation, main as manageLocations };


const addLocationQuestions = [
        {
          type: "text",
          name: "address",
          message: "Enter address:",
        },
        {
          type: "text",
          name: "city",
          message: "Enter city:",
        },
        {
          type: "text",
          name: "country",
          message: "Enter country:",
        },
        {
          type: "number",
          name: "longitude",
          message: "Enter longitude:",
          validate: Number.parseFloat,
        },
        {
          type: "number",
          name: "latitude",
          message: "Enter latitude:",
          validate: Number.parseFloat,
        },
];

// Function to add a discount to the database
const addLocation = async (db, business) => {
    const locationData = await prompts(addLocationQuestions);
    try{
        await db.location.create({ 
            business_id: business.business_id,
            ...locationData
        });
    } catch(e) {
        console.log("Failed to add location", e);
    }
}
// Function to remove a customer from the database
const removeLocation = async (db, business) => {
    const locs = await db.location.get_all(business.business_id);
    if(locs.length == 1) {
        console.log("You cannot remove any more locations (You only have one)");
        return;
    }
    const choices = await prompts({
      type: "autocompleteMultiselect",
      name: "loc_id",
      message: "Select locations to remove.",
      required: true,
      choices: locs.map((data) => ({
        title: data.address+ ", " + data.city +"," + data.country,
        value: data.location_id,
      })),
    });

    for(const id of choices.loc_id) {
        await db.location.delete(id);
    }
    console.log("Action success.");
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

const viewLocation = async (db, business) => {
  try {
   const all_locations = await db.location.get_all(
      business.business_id,
    );
    if(all_locations.length == 0 ) {
        console.clear();
        console.log("Get busy. You have no locations");
        return;
    }
    
    all_locations.forEach((customer) =>
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
      { title: "Add Location", value: "add" },
      { title: "Remove Location", value: "remove" },
      { title: "View Locations", value: "view" }
 //     { title: "Edit Discount", value: "edit" },
    ],
  });

  if (choice === "add") {
    await addLocation(database, business);
  } else if (choice === "remove") {
    await removeLocation(database, business);
  } else if (choice == "view") {
    await viewLocation(database, business);
  }
}
