import prompts from "prompts";

export const create = async (database, credentials) => {
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

  const { action } = await prompts({
    type: "select",
    choices: [
      {
        type: "create",
        description: "create a new business",
      },
      {
        type: "join",
        description: " join a new business",
      },
    ],
  });

  switch (action) {
    case "create":
      {
        let prompt_obj = {};
        await database.business.create(prompt_obj);

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
            type: "text",
            name: "password",
            message: "Enter password:",
          },
        ]);
        const location_response = await prompts([
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

        console.log("Business Object:", businessObject);
      }
      break;
    case "join":
      {
        //await database.business.find();
      }
      break;
  }

  const result = {
    //hardcoded TODO: FIX
    business_id: 0,
    email: data.email,
    password: data.password,
  };
  console.log(result);

  //    database.business_user.create_business_user({
  //
  //
  //    });
};
