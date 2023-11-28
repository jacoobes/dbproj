const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('main.db');

const queries = [
    `
    INSERT INTO Customer (business_id, name, join_date, phone_number)
    VALUES (1, 'John Doe', '2023-01-01', 1234567890);
    `,

    `
    SELECT b.business_name, b.brand, b.address, b.city, b.country, l.longitude, l.latitude
    FROM Business b
    JOIN Location l ON b.location_id = l.location_id;
    `,

    `
    UPDATE BusinessUser
    SET email = 'newemail@example.com'
    WHERE business_user_id = 1;
    `,

    `
    UPDATE Discount
    SET is_redeemed = true
    WHERE customer_id = 1 AND discount_id = 1;
    `,

    `
    SELECT b.business_name, d.discount_code, d.discount_percent
    FROM Business b
    JOIN Discount d ON b.business_id = d.business_id
    WHERE d.discount_percent > 10;
    `
];

 queries.forEach(query => {
    db.run(query, [], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Query executed successfully.');
        }
    });
});

 db.close();
