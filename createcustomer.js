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
      name: 'customer_phone_number',
      message: 'Enter customer phone number to remove customer from list:',
    },
  ];
  const addCustomer = async (db, businessId) => {
    try {
      const response = await prompts(addCustomerQuestions);
      const customerObject = {
        name: response.name,
        join_date: response.join_date,
        phone_number: response.phone_number,
        business_id: businessId,  
      };
  
      const customerCreated = await db.customer.create(customerObject);
  
      console.log('Customer added successfully!', customerCreated);
    } catch (error) {
      console.error('Error adding customer:', error);
    } finally {
      db.close();
    }
  };
  
   const removeCustomer = async () => {
    try {
      const { customer_id } = await prompts(removeCustomerQuestions);
      
      
      console.log('Customer removed successfully!');
    } catch (error) {
      console.error('Error removing customer:', error);
    } finally {
      process.exit(1);
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
  