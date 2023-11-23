import prompts from 'prompts'
export {addCustomer, removeCustomer}

const addCustomerQuestions = [
    {
      type: 'text',
      name: 'name',
      message: 'enter customer name:',
    },
    {
      type: 'text',
      name: 'join_date',
      message: 'enter join date (yyyy-mm-dd):',

      type: 'text',
      name: 'phone_number',
      message: 'enter customer phone number:',
    },
  ];
  
const removeCustomerQuestions = [
    {
      type: 'number',
      name: 'customer_id',
      message: 'Enter customer ID to remove:',
    },
];

// Function to add a customer to the database
const addCustomer = async (db, business) => {
    try {
        const customerData = await prompts(addCustomerQuestions);

        console.log('Customer added successfully!');
    } catch (error) {
        console.error('Error adding customer:', error);

        db.close();
    } 
};

// Function to remove a customer from the database
const removeCustomer = async (db, business) => {
    try {
      const { customer_id } = await prompts(removeCustomerQuestions);
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
    const { all } = await prompts(viewCustomersQuestions);
    
    
}
