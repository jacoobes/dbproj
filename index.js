import prompts from "prompts";
import { exit, readSqlAndInit } from "./tools.js";
import { initiate } from "./db.js";

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
    ],
  },
  { onCancel: exit(1) },
);

const database = await initiate("./database/main.db");


if (action == "login") {
  import("./login.js").then((module) => module.login(database));
} else {
  import("./create.js").then((module) => module.create(database));
}
