import prompts from "prompts";
import { exit, readSqlAndInit } from "./tools.js";
import { initiate } from "./db.js";
import { readFile } from 'fs/promises'
console.clear();
console.log(
  `
/$$          /$$$$$ /$$$$$$$  /$$$$$$$$ /$$   /$$ /$$   /$$
| $$         |__  $$| $$__  $$|__  $$__/| $$  /$$/| $$  /$$/
| $$            | $$| $$  \ $$   | $$   | $$ /$$/ | $$ /$$/ 
| $$            | $$| $$$$$$$    | $$   | $$$$$/  | $$$$$/  
| $$       /$$  | $$| $$__  $$   | $$   | $$  $$  | $$  $$  
| $$      | $$  | $$| $$  \ $$    | $$   | $$\  $$  | $$\  $$ 
| $$$$$$$$|  $$$$$$/| $$$$$$$/   | $$   | $$ \  $$ | $$ \  $$
|________/ \______/ |_______/     |__/   |__/  \__/ |__/  \__/
Business Management Services\n\n`.trim(),
);
//choose the action used
const { action } = await prompts(
  {
    type: "select",
    name: "action",
    message: "Choose an action",
    choices: [
      {
        value: "login",
        description: "Login to your account",
      },
      {
        value: "create",
        description: "Create an account",
      },
      {
        value: "gen",
        description: "Generate fake data to test"
      }
    ],
  },
  { onCancel: exit(1) },
);

const database = await initiate("./database/main.db");

if (action == "login") {
  import("./login.js")
        .then((module) => module.login(database));
} else  if (action === 'create') {
  import("./create.js")
        .then((module) => module.create(database));
} else if (action == "gen") {
  console.log("Genning fake data");
  const { gen_data }  = await import("./add_fake_data.js");
  gen_data(database.__internal);
  console.log("DONE. Re run the application. View add_fake_data.js to see the added data");
}

