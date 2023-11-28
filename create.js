import prompts from "prompts";
import { exit } from './tools.js'
export const create = async (database) => {
  const data = await prompts(
    [
      {
        type: "text",
        name: "email",
        message: "email",
      },
      {
        type: "confirm",
        name: "confirmemail",
        message: "confirm email",
      },
      {
        type: "password",
        name: "password",
        message: "password",
      },
      {
        type: "confirm",
        name: "confirmpassword",
        message: "confirm password",
      },
    ],
    { onCancel: () => (database.destroy(), process.exit(1)) },
  );

  if (!(data.email && data.confirmemail)) {
    console.error("cancelled");
    process.exit(1);
  }
  if (!(data.password && data.confirmpassword)) {
    console.error("cancelled");
    process.exit(1);
  }

  const { action } = await prompts(
    {
      message: "Creating an account: create or join a business?",
      type: "select",
      name: "action",
      choices: [
        {
          value: "create",
          description: "create a new business",
        },
        {
          value: "join",
          description: " join a new business",
        },
      ],
    },
    { onCancel: () => (process.exit(1), database.destroy()) },
  );

  switch (action) {
    case "create": {
      const response = await prompts([
        {
          type: "text",
          name: "business_name",
          message: "Enter business_name:",
        },
        {
          type: "text",
          name: "brand",
          message: "Enter brand:",
        },
        
        {
          type: "text",
          name: "password",
          message: "Enter password:",
        },
      ]);
      const location_response = await prompts([
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
      ]);

      // Convert the response to a Business object
      const businessObject = { ...response };

      const business_created = await database.business.create(businessObject);
      // Convert the response to a Location object
      const locationObject = { 
          ...location_response,
          business_id: business_created.business_id  
      };
      
      const location_created = await database.location.create(locationObject);
      console.log('Location Object', locationObject);
      console.log("Business Object:", business_created);
      const bu = {
        business_id: business_created.business_id,
        email: data.email,
        password: data.password,
      };
      const user = await database.business_user.create_business_user(bu);
      console.log("Created user:", user);
      console.log("Now go login!");
      return;
    }
    case "join": {
      const businesses = await database.business.get_all();
      if (businesses.length == 0) {
        console.log("Nothing to join.");
        return;
      }
      const business_choices = await prompts(
        {
          type: "autocomplete",
          name: "business_id",
          message: "Find your business",
          choices: businesses.map((data) => ({
            title: data.business_name,
            value: data.business_id,
          })),
        },
        {
          onCancel: exit(1),
        },
      );
      const selected = await database.business.get(
        business_choices.business_id,
      );
      await prompts(
        [
          {
            type: "password",
            name: "password",
            message: "password",
            validate: (pw) => pw === selected.password,
          },
        ],
        {
          onCancel: () => {
            database.destroy();
            process.exit(0);
          },
        });
      const bu = {
        business_id: selected.business_id,
        email: data.email,
        password: data.password,
      };
      const user = await database.business_user.create_business_user(bu);
      console.log("Created user:", user);
      console.log("Now go login!");
      return;
    }
  }
};
