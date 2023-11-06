import prompts from 'prompts'
import options from './option.js'
import { initiate } from './db.js'

console.log("Welcome. Please choose an option");

//choose the action used
const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: "Choose an action",
    choices: [
        {
            value: "login",
            description: "Login to your account"
        },
        {
            value: "create",
            description: "Create an account"
        }
    ]
},
    {  onCancel: () => (console.log("Cancelled"), process.exit(0)) }
);

const database = await initiate();

if(action == "login") {
    console.log("Login");
    const business = await prompts({ 
        type: 'number',
        name: 'value',
        message: "business id",
        validate: Number.isInteger
    }, 
        { 
            onCancel : () => { 
                process.exit(0);
            }
        });

    const acct_prompt = await prompts([
        {
            type: 'text',
            name: 'email',
            message: 'email'
        },
        {
            type: 'password',
            name: 'password',
            message: 'password'
        }
    ],  { 
            onCancel: () => { 
                database.destroy();
                process.exit(0);
            }
    } );

    const body = { 
        email: acct_prompt.email,
        password: acct_prompt.password,
        business_id: business.value
    };

    const account = database
        .business_user
        .get_user_by_email(body.email);

//    const json = await fetch(base_link+'/business/'+business.value)
//    const acct = await fetch(base_link+'/account/login', { method: 'POST', body }).then(res=> res.json())
//
//    await prompt_found_business({ business: json, acct })

} else {
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
}

//function used as the loop for login
async function prompt_found_business(businessResult) {

  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'choice',
    
    choices: [
      { title: 'info', description: 'option1 description', value: '1' },
      { title: 'view customers', description: 'option1 description', value: '2' },
      { title: 'add admin', description: 'add admin', value: '3' },
      { title: 'exit',  description: 'exit' ,value: '0' }
    ],
    initial: 1
  })
  if(response.value === '0') {
    return false
  }
  return (await options[response.value](businessResult)) & prompt_found_business(businessResult)
}

