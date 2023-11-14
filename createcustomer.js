import prompts from 'prompts'
export {addCustomer}

const addCustomerQuestions = [
    {
      type: 'text',
      name: 'Name',
      message: 'Enter customer name:',
    },
    {
      type: 'text',
      name: 'join_date',
      message: 'Enter join date (YYYY-MM-DD):',

      type: 'text',
      name: 'phone_number',
      message: 'Enter customer phone number:',
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
    } finally {
      db.close();
    }
  };
  
  // Function to remove a customer from the database
  const removeCustomer = async () => {
    try {
      const { customer_id } = await prompts(removeCustomerQuestions);
      
      
      console.log('Customer removed successfully!');
    } catch (error) {
      console.error('Error removing customer:', error);
    } finally {
      db.close();
    }
  };
  
  // Main function to display options and handle user input
  const main = async () => {
    const { choice } = await prompts({
      type: 'select',
      name: 'choice',
      message: 'Choose an option:',
      choices: [
        { title: 'Add Customer', value: 'add' },
        { title: 'Remove Customer', value: 'remove' },
      ],
    });
  
    if (choice === 'add') {
      await addCustomer();
    } else if (choice === 'remove') {
      await removeCustomer();
    }
  };
  