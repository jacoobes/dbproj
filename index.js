import prompts from "prompts";
import { initiate } from "./db.js";

console.log("Welcome. Please choose an option");

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
  { onCancel: () => (console.log("Cancelled"), process.exit(0)) },
);

const database = await initiate("./database/main.db");
if (action == "login") {
  import("./login.js").then((module) => module.login(database));
} else {
  import("./create.js").then((module) => module.create(database));
}
