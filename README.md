```
/$$          /$$$$$ /$$$$$$$  /$$$$$$$$ /$$   /$$ /$$   /$$
| $$         |__  $$| $$__  $$|__  $$__/| $$  /$$/| $$  /$$/
| $$            | $$| $$  \ $$   | $$   | $$ /$$/ | $$ /$$/ 
| $$            | $$| $$$$$$$    | $$   | $$$$$/  | $$$$$/  
| $$       /$$  | $$| $$__  $$   | $$   | $$  $$  | $$  $$  
| $$      | $$  | $$| $$  \ $$    | $$   | $$\  $$  | $$\  $$ 
| $$$$$$$$|  $$$$$$/| $$$$$$$/   | $$   | $$ \  $$ | $$ \  $$
|________/ \______/ |_______/     |__/   |__/  \__/ |__/  \__/
```
*Business Management Services*


## Why?
Business and their employees should be able to manage their databases in an efficient manner, especially on critical servers where a GUI is not possible. This CLI tools helps businesses manage their companies with ease.

## Features
- Add **customers**, **discounts**, **locations**, and your **business** to the database
- Delete **discounts**, **customers**, **locations**, from the database.
- View **discounts**, **customers**, **locations**, from the database.

## Prereqs 

- node-gyp (this comes with a standard node installation)
- node 
- npm 

## Run:
```sh 
npm install
node .
```
## Fake data
- Run our application as above.
- When prompted, select the gen option to create fake data.
- Then, rerun the application, trying to login

## TESTS: 

- We added 5+ test queries to ensure database is clean and working. 
- To test, run:

```sh
npm test
```
