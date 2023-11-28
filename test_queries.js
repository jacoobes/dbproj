import  sqlite3  from "sqlite3";

const db = new sqlite3.Database('main.db');

const tableCreationScript = `
-- We split this line by the comments that say DO NOT ...
-- in order to process each table creation as separate 
-- statement for sqlite to work correctly
CREATE TABLE IF NOT EXISTS customer (
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id INTEGER REFERENCES business(business_id),
  name VARCHAR,
  join_date VARCHAR,
  phone_number INTEGER
);
--DO NOT TOUCH THIS LINE
CREATE TABLE IF NOT EXISTS location (
  location_id INTEGER PRIMARY KEY AUTOINCREMENT,
  longitude INTEGER,
  latitude INTEGER
);
--DO NOT TOUCH THIS LINE
CREATE TABLE IF NOT EXISTS business (
  business_name VARCHAR UNIQUE,
  business_id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand VARCHAR,
  address VARCHAR,
  city VARCHAR,
  country VARCHAR,
  password VARCHAR NOT NULL,
  location_id INTEGER REFERENCES location(location_id)
);
--DO NOT TOUCH THIS LINE
CREATE TABLE IF NOT EXISTS business_user (
  business_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id INTEGER REFERENCES business(business_id),
  email VARCHAR UNIQUE,
  password VARCHAR NOT NULL
);
--DO NOT TOUCH THIS LINE
CREATE TABLE IF NOT EXISTS discount (
  discount_id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER REFERENCES customer(customer_id),
  discount_code VARCHAR UNIQUE,
  discount_percent INTEGER,
  is_redeemed BOOLEAN
);
`;

db.exec(tableCreationScript, (err) => {
    if (err) {
        console.error('Error creating tables:', err.message);
    } else {
        console.log('Tables created successfully.');
        
        const queries = [
            `
            INSERT INTO customer (business_id, name, join_date, phone_number)
            VALUES (1, 'John Doe', '2023-01-01', 1234567890);
            `,
        
            `
            SELECT b.business_name, b.brand, b.address, b.city, b.country, l.longitude, l.latitude
            FROM business b
            JOIN location l ON b.location_id = l.location_id;
            `,
        
            `
            UPDATE business_user
            SET email = 'newemail@example.com'
            WHERE business_user_id = 1;
            `,
        
            `
            UPDATE discount
            SET is_redeemed = true
            WHERE customer_id = 1 AND discount_id = 1;
            `,
        
            `
            SELECT c.name AS customer_name, d.discount_code, d.discount_percent
            FROM customer c
            JOIN discount d ON c.customer_id = d.customer_id
            WHERE d.discount_percent > 10;
            `
        ];
        
        // Execute queries
        queries.forEach(query => {
            db.run(query, [], (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Query executed successfully.');
                }
            });
        });
    }
    
     db.close();
});
