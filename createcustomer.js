import prompts from 'prompts'
export {addCustomer, removeCustomer, viewCustomers}

const addCustomerQuestions = [
    {
      type: 'text',
      name: 'name',
      message: 'enter customer name:',
    },
    {
      type: 'text',
      name: 'phone_number',
      message: 'enter customer phone number:',
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
            business_id: business.business_id
        });

        console.log('Customer added successfully!');
    } catch (error) {
        console.error('Error adding customer:', error);

        db.close();
    } 
};

// Function to remove a customer from the database
const removeCustomer = async (db, business) => {
    const all_customers = await db.customer.get_all_from_business(business.business_id);
    if(all_customers.length == 0) {
        console.log("No customers to delete! Returning")
        return;
    }
    const customers= await prompts(
    {
      type: "autocomplete",
      name: "ci_id",
      message: "remove customers",
      required:true,
      choices: all_customers
        .map(data => ({ title: data.name+", "+data.phone_number, value: data.customer_id }))
    },
    {
      onCancel: () => {
        process.exit(1);
      },
    
    },
  );
    try {
      await db.customer.delete_by_id(customers.ci_id);
      console.log('Customer removed successfully!');
    } catch (error) {
      console.error('Error removing customer:', error);
      db.close()
    }
};

const viewCustomersQuestions = [
    {
      type: 'select',
      name: 'value',
      message: 'Pick an action',
      choices: [
        { title: 'View all', description: 'This option has a description', value: 'all' },
        { title: 'View one', value: 'one' },
      ],
    },

];

const viewCustomers = async (db, business) => {
    const { value } = await prompts(viewCustomersQuestions);
    if(value == "one") {
        
    } else {
        const customers = await db.customer.get_all_from_business(business.business_id);
        if(customers.length == 0 ){
            console.log("No customers to show. Get busy");
            return;
        }
        for(const customer of customers) {
            console.log(JSON.stringify(customer, "business_id", 3));
        }
    }
}
