import options from "./option.js";
import prompts from "prompts";
//function used as the loop for login
async function prompt_found_business(businessResult) {
  const response = await prompts({
    type: "select",
    name: "value",
    message: "choice",

    choices: [
      { title: "info", description: "option1 description", value: "1" },
      {
        title: "view customers",
        description: "option1 description",
        value: "2",
      },
      { title: "add admin", description: "add admin", value: "3" },
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

export const login = async (database, credentials) => {
  const business = await prompts(
    {
      type: "number",
      name: "value",
      message: "business id",
      validate: Number.isInteger,
    },
    {
      onCancel: () => {
        process.exit(0);
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

  const account = database.business_user.get_user_by_email(body.email);

  //    const json = await fetch(base_link+'/business/'+business.value)
  //    const acct = await fetch(base_link+'/account/login', { method: 'POST', body }).then(res=> res.json())
  //
  //    await prompt_found_business({ business: json, acct })
};
