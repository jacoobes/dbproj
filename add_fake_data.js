
import { writeFileSync } from 'fs'
const businessExprs = [
  `INSERT INTO business (business_name, brand, password) 
   VALUES ('Business1', 'Brand1', 'password1');`,
  `INSERT INTO business (business_name, brand, password)
   VALUES ('Business2', 'Brand2', 'password2');`,
  `INSERT INTO business (business_name, brand, password) 
   VALUES ('Business3', 'Brand3', 'password3');`,
  // Add more businesses as needed
];
const locationExprs = [
  `INSERT INTO location (longitude, latitude, address, city, country, business_id)
    VALUES (-73.42, 40.730610, 'Address1', 'City1', 'Country1', 1);`,
  `INSERT INTO location (longitude, latitude, address, city, country, business_id)
    VALUES (-71.9352, 10.710, 'Address2', 'City2', 'Country2', 2);`,
  `INSERT INTO location (longitude, latitude, address, city, country, business_id)
    VALUES (-80.1917902, 25.7616798, 'Address3', 'City3', 'Country3', 3);`,
  // Add more locations as needed
];



const customerExprs = [
  "INSERT INTO customer (business_id, name, join_date, phone_number) VALUES (1, 'John Doe', '2023-01-01', 1234567890);",
  "INSERT INTO customer (business_id, name, join_date, phone_number) VALUES (2, 'Jane Smith', '2023-02-15', 9876543210);",
  "INSERT INTO customer (business_id, name, join_date, phone_number) VALUES (3, 'Bob Johnson', '2023-03-20', 5551234567);",
  // Add more customers as needed
];

const businessUserExprs = [
  "INSERT INTO business_user (business_id, email, password) VALUES (1, 'john@example.com', 'userpassword1');",
  "INSERT INTO business_user (business_id, email, password) VALUES (2, 'jane@example.com', 'userpassword2');",
  "INSERT INTO business_user (business_id, email, password) VALUES (3, 'bob@example.com', 'userpassword3');",
  // Add more business users as needed
];

const discountExprs = [
  "INSERT INTO discount (customer_id, discount_code, discount_percent, is_redeemed) VALUES (1, 'NEWYEAR20', 20, 0);",
  "INSERT INTO discount (customer_id, discount_code, discount_percent, is_redeemed) VALUES (2, 'SALE50', 50, 0);",
  "INSERT INTO discount (customer_id, discount_code, discount_percent, is_redeemed) VALUES (3, 'FREESHIP', 10, 1);",
];

const allExprs = [...locationExprs, ...businessExprs, ...customerExprs, ...businessUserExprs, ...discountExprs];

// Create the SQL file with all the generated INSERT statements
const sqlContent = `
${allExprs.join('\n--DO NOT TOUCH THIS LINE\n')}
`;

writeFileSync('./sql/fake_data.sql', sqlContent);

