import prompts from 'prompts'
export {addDiscount}

const addDiscountQuestions = [
    {
      type: 'text',
      name: 'discount_percentage',
      message: 'Enter discount percentage:',

      type: 'text',
      name: 'discount_code',
      message: 'Enter discount code:',
    },
  ];
  
  const removeDiscountQuestions = [
    {
      type: 'number',
      name: 'discount_id',
      message: 'Enter discount ID to remove:',
    },
  ];

const updateDiscountQuestions = [
    {
      type: 'number',
      name: 'discount_id',
      message: 'Enter discount ID to update:',

      type: 'text',
      name: 'discount_percentage',
      message: 'Enter new discount percentage:',
    },
  ];
  
  // Function to add a discount to the database
  const addDiscount = async (db, business) => {
    try {
      const discountData = await prompts(addDiscountQuestions);
      
      
      console.log('Discount added successfully!');
    } catch (error) {
      console.error('Error adding discount:', error);
      db.close();
    } finally {
      
    }
  };
  
  // Function to remove a customer from the database
  const removeDiscount = async () => {
    try {
      const { discount_id } = await prompts(removeDiscountQuestions);
      
      
      console.log('Discount removed successfully!');
    } catch (error) {
      console.error('Error removing discount:', error);
      db.close();
    } finally {
    }
  };

// Function to update a discount in the database
  const updateDiscount = async () => {
    try {
      const { discount_id } = await prompts(updateDiscountQuestions);
      
      
      console.log('Discount updated successfully!');
    } catch (error) {
      console.error('Error updating discount:', error);
      db.close();
    } finally {
    }
  };
  
  // Main function to display options and handle user input
  const main = async () => {
    const { choice } = await prompts({
      type: 'select',
      name: 'choice',
      message: 'Choose an option:',
      choices: [
        { title: 'Add Discount', value: 'add' },
        { title: 'Remove Discount', value: 'remove' },
        { title: 'Edit Discount', value: 'edit'},
      ],
    });
  
    if (choice === 'add') {
      await addDiscount();
    } else if (choice === 'remove') {
      await removeDiscount();
    } else if (choice === 'edit'){
      await updateDiscount();
    }
  };
  
