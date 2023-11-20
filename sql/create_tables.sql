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
CREATE TABLE IF NOT EXISTS discount_table (
  discount_id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id INTEGER REFERENCES business(business_id),
  business_user_id INTEGER REFERENCES business_user(business_user_id),
  discount_code VARCHAR UNIQUE,
  discount_percent INTEGER,
  is_redeemed BOOLEAN
);
