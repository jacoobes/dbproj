import prompts from 'prompts'

export const create = async (database) => {
 const data = await prompts([{ 
            type: 'text',
            name: 'email',
            message: 'email',
        },
        { 
            type: 'confirm',
            name: 'confirmemail',
            message: 'confirm email',
        },
        {
            type: 'password',
            name: 'password',
            message: 'password'
        },
        { 
            type: 'confirm',
            name: 'confirmpassword',
            message: 'confirm password',
        },
       
    ],
    { onCancel: () => (database.destroy(), process.exit(1)) });

    if(!(data.email && data.confirmemail)) {
        console.error('cancelled')
        process.exit(1);
    }
    if(!(data.password && data.confirmpassword)) {
        console.error('cancelled')
        process.exit(1);
    }

    const { action } = await prompts({ 
        message: "Creating an account: create or join a business?",
        type: 'select',
        name: "action",
        choices: [
            {
                value: 'create',
                description: 'create a new business'
            },
            {
                value: 'join',
                description:' join a new business'
            }
        ]
    }, { onCancel: () => (process.exit(1), database.destroy()) });

    switch(action) {
        case "create": {
            
            const response = await prompts([
                {
                  type: 'text',
                  name: 'business_name',
                  message: 'Enter business_name:',
                },
                {
                  type: 'text',
                  name: 'brand',
                  message: 'Enter brand:',
                },
                {
                  type: 'text',
                  name: 'address',
                  message: 'Enter address:',
                },
                {
                  type: 'text',
                  name: 'city',
                  message: 'Enter city:',
                },
                {
                  type: 'text',
                  name: 'country',
                  message: 'Enter country:',
                },
                {
                  type: 'text',
                  name: 'password',
                  message: 'Enter password:',
                },
              ]);
              const location_response = await prompts([
                {
                  type: 'number',
                  name: 'longitude',
                  message: 'Enter longitude:',
                  validate: Number.parseFloat
                },
                {
                  type: 'number',
                  name: 'latitude',
                  message: 'Enter latitude:',
                  validate: Number.parseFloat,
                }
              ]);
              // Convert the response to a Location object
              const locationObject = {
                longitude: location_response.longitude,
                latitude: location_response.latitude,
              };
              // Convert the response to a Business object
              const businessObject = {
                business_name: response.business_name,
                brand: response.brand,
                address: response.address,
                city: response.city,
                country: response.country,
                password: response.password,
              };

              const location_created = await database.location.create(locationObject);
              const business_created = await database.business.create(businessObject); 
              console.log('Business Object:', businessObject);
            const bu = {
                business_id: business_created.business_id,
                email: data.email,
                password: data.password,    
            };
            console.log(await database.business_user.get(1));
            const user = await database.business_user.create_business_user(bu);
            console.log('Created user:', user)
            console.log('Now go login!');
        } break;
        case "join": {
            
            //await database.business.find();
        } break;
    }


    const businessUserObject = {
      email: data.email,
      password: data.password,
      business_id:1 ,
      business_user_id : 1
    };
  
    try {
      // Insert the business user data into the business_user table
      const businessUserCreated = await database.business_user.create_business_user(businessUserObject);
  
      console.log('Business User Object:', businessUserObject);
      console.log('Business User Created:', businessUserCreated);
      console.log('Business User ID:', businessUserCreated.business_user_id);
    } catch (error) {
      console.error('Error creating business user:', error);
      process.exit(1);
    }
  };
