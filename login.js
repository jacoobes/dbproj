import options from "./option.js";
import prompts from "prompts";
//function used as the loop for login
async function prompt_found_business(businessResult) {
  const response = await prompts({
    type: "select",
    name: "value",
    message: "choice",

    choices: [
      {
        title: "Manage Customers",
        description: "CRUD for customers",
        value: "1",
      },
      {
        title: "Manage Discounts",
        description: "CRUD for discounts",
        value: "2",
      },
      //{ title: "View Customer", description: "add admin", value: "3" },
      { title: "exit", description: "exit", value: "0" },
    ],
    initial: 1,
  });
  if (response.value === "0") {
    return false;
  }
  return (
    (await options[response.value](businessResult)) &
    prompt_found_business(businessResult)
  );
}

export const login = async (database) => {
  const business = await prompts(
    {
      type: "autocomplete",
      name: "business_id",
      message: "Find your business",
      choices: (await database.business.get_all()).map((data) => ({
        title: data.business_name,
        value: data.business_id,
      })),
    },
    {
      onCancel: () => {
        console.log("onCancel");
        process.exit(1);
      },
    },
  );

  const acct_prompt = await prompts(
    [
      {
        type: "text",
        name: "email",
        message: "email",
      },
      {
        type: "password",
        name: "password",
        message: "password",
      },
    ],
    {
      onCancel: () => {
        database.destroy();
        process.exit(0);
      },
    },
  );

  const body = {
    email: acct_prompt.email,
    password: acct_prompt.password,
    business_id: business.value,
  };
  console.log("Email entered:", body.email);
  console.log("Password entered:", body.password);

  const account = await database.business_user.get_user_by_email(body.email);

  console.log("Retrieved account:", account);

  if (account && account.password === body.password) {
    console.log("Login successful!");
    const selected_business = await database.business.get(business.business_id);
    await prompt_found_business({
      business: selected_business,
      acct: account,
      database,
    });
  } else {
    console.error("Login failed. Please check your email and password.");
    process.exit(1);
  }
};
