INSERT INTO business (business_name, brand, password) 
   VALUES ('Business1', 'Brand1', 'password1');
--DO NOT TOUCH THIS LINE
INSERT INTO business (business_name, brand, password)
   VALUES ('Business2', 'Brand2', 'password2');
--DO NOT TOUCH THIS LINE
INSERT INTO business (business_name, brand, password) 
   VALUES ('Business3', 'Brand3', 'password3');
--DO NOT TOUCH THIS LINE
INSERT INTO location (longitude, latitude, address, city, country, business_id)
    VALUES (-73.42, 40.730610, 'Address1', 'City1', 'Country1', 1);
--DO NOT TOUCH THIS LINE
INSERT INTO location (longitude, latitude, address, city, country, business_id)
    VALUES (-71.9352, 10.710, 'Address2', 'City2', 'Country2', 2);
--DO NOT TOUCH THIS LINE
INSERT INTO location (longitude, latitude, address, city, country, business_id)
    VALUES (-80.1917902, 25.7616798, 'Address3', 'City3', 'Country3', 3);
--DO NOT TOUCH THIS LINE
INSERT INTO customer (business_id, name, join_date, phone_number) VALUES (1, 'John Doe', '2023-01-01', 1234567890);
--DO NOT TOUCH THIS LINE
INSERT INTO customer (business_id, name, join_date, phone_number) VALUES (2, 'Jane Smith', '2023-02-15', 9876543210);
--DO NOT TOUCH THIS LINE
INSERT INTO customer (business_id, name, join_date, phone_number) VALUES (3, 'Bob Johnson', '2023-03-20', 5551234567);
--DO NOT TOUCH THIS LINE
INSERT INTO business_user (business_id, email, password) VALUES (1, 'john@example.com', 'userpassword1');
--DO NOT TOUCH THIS LINE
INSERT INTO business_user (business_id, email, password) VALUES (2, 'jane@example.com', 'userpassword2');
--DO NOT TOUCH THIS LINE
INSERT INTO business_user (business_id, email, password) VALUES (3, 'bob@example.com', 'userpassword3');
--DO NOT TOUCH THIS LINE
INSERT INTO discount (customer_id, discount_code, discount_percent, is_redeemed) VALUES (1, 'NEWYEAR20', 20, 0);
--DO NOT TOUCH THIS LINE
INSERT INTO discount (customer_id, discount_code, discount_percent, is_redeemed) VALUES (2, 'SALE50', 50, 0);
--DO NOT TOUCH THIS LINE
INSERT INTO discount (customer_id, discount_code, discount_percent, is_redeemed) VALUES (3, 'FREESHIP', 10, 1);
