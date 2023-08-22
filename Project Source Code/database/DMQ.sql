-- : is used to denote variables in our JS that will supply values to our 
-- SQL queries.



-- Customers
---------------------------------------------

-- Adds a new customer 
INSERT INTO Customers (fname, lname, phone, address1, address2, 
city, state, zipcode, country)  

VALUES (:customer_fname_input, :customer_lname_input, 
:customer_phone_input, :customer_address1_input, :customer_address2_input, 
:customer_city_input, :customer_state_input, :customer_zipcode_input, 
:customer_country_input);


-- Displays all customers.
SELECT customer_id, fname, lname, 
CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
address1, address2, city, state, zipcode, country FROM Customers;


-- Searches for a customer based on their last name.
SELECT customer_id, fname, lname, 
CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
address1, address2, city, state, zipcode, country
FROM Customers WHERE lname LIKE :input_lastname;


-- Updates a customer's information.
UPDATE Customers 
SET fname=:input_customer_fname, 
lname=:input_customer_lname, phone=:input_customer_phone, 
address1=:input_customer_address1, address2=:input_customer_address2, 
city=:input_customer_city, state=:input_customer_state, 
zipcode=:input_customer_zipcode, country=:input_customer_country
WHERE customer_id=:update_customer_id; 


-- Deletes a customer's information.
DELETE FROM Customers WHERE customer_id = :deleteinput;



-- Drivers
---------------------------------------------

-- Adds a new driver.
INSERT INTO Drivers (fname, lname, phone, available) 
VALUES (:driver_fname_input, :driver_lname_input, 
:driver_phone_input, driver_available_input); 


-- Retrieves all drivers. Concatenates phone number and displays yes/no instead of 0/1 for availability to increase legibility.
SELECT driver_id, fname, lname, 
CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
IF(available=0, 'No', 'Yes') AS available, available AS Available 
FROM Drivers;


-- Retrieves all drivers based on last name entered.
SELECT driver_id, fname, lname, 
CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
IF(available=0, 'No', 'Yes') AS available, available AS Available
FROM Drivers 
WHERE lname LIKE :lnameinput


-- Deletes a driver.
DELETE 
FROM Drivers
WHERE Drivers.driver_id=:delete_driver_id; 


-- Displays a driver's information based on ID.
SELECT driver_id, fname, lname, phone, available 
FROM  Drivers 
WHERE driver_id=:update_driver_id; 

-- Updates a driver's information.
UPDATE Drivers 
SET fname=:input_fname, lname=:input_lname, 
phone=:input_phone, available=:input_available 
WHERE driver_id=:update_driver_id; 


-- Products
---------------------------------------------

-- Add a new product.
INSERT INTO Products (name, description, price, stock) 
VALUES (:input_product_name, :input_product_description, 
:input_product_price, :input_product_stock); 


-- Display all products.
SELECT product_id, name, description, 
CONCAT('$', FORMAT(price,2)) as price, stock FROM Products;


-- Display products based on last name filter.
SELECT product_id, name, description, CONCAT('$', FORMAT(price,2)) AS price, 
stock FROM Products WHERE name LIKE :lnameinput;


-- Updates a product's information.
UPDATE Products 
SET name=:input_product_name, description=:input_product_description, 
price=:input_product_price, stock=:input_product_stock 
WHERE product_id=:update_product_id; 


-- OrderStatuses
---------------------------------------------


-- Add a new order status.
INSERT INTO OrderStatuses (orderstatus_id, description) 
VALUES (:input_orderstatus_id, :input_orderstatus_description); 


-- Display all order statuses.
SELECT *
FROM OrderStatuses;


-- Update OrderStatus.
UPDATE OrderStatuses 
SET description=:input_orderstatus_description 
WHERE orderstatus_id=:update_orderstatus_id; 


-- Delete an OrderStatus
DELETE FROM OrderStatuses WHERE orderstatus_id = :inputorderstatus;


-- Orders
---------------------------------------------


-- Query to add a new order when a driver is not selected.
INSERT INTO Orders (customer_id, order_date, address1, address2, city, state, zipcode, country, total, orderstatus_id, driver_id) 
    VALUES (:inputcustomerid, :inputorderdate, :inputstreet, 
    :inputunit, :inputcity, :inputstate, input:zipcode, input:country, 0, 
    :inputorderstatusid, NULL)


-- Query to add a new order when a driver is selected.
INSERT INTO Orders (customer_id, order_date, address1, address2, city, state, zipcode, country, total, orderstatus_id, driver_id) 
    VALUES (:inputcustomerid, :inputorderdate, :inputstreet, 
    :inputunit, :inputcity, :inputstate, input:zipcode, input:country, 0, 
    :inputorderstatusid, :inputdriverid)


-- Display all orders, including the driver (if there is one associated) and the customer who placed the order.
SELECT order_id AS OrderID, DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
    Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
    Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', CONCAT('$', FORMAT(total, 2)) AS Total, orderstatus_id AS 'Order Status', 
    CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver, CONCAT(Customers.fname, " ", Customers.lname) AS Customer, Drivers.driver_id
    FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
    ON Customers.customer_id=Orders.customer_id ORDER BY OrderID ASC;


-- Filters orders by customer name.
SELECT order_id AS OrderID, CONCAT(Customers.fname, " ", Customers.lname) AS Customer, DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
    Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
    Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', CONCAT('$', FORMAT(total, 2)) AS Total, orderstatus_id AS 'Order Status', 
    CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver, Drivers.driver_id
    FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
    ON Customers.customer_id=Orders.customer_id WHERE CONCAT(Customers.fname, " ", Customers.lname) LIKE :inputcustomername ORDER BY OrderID ASC;


-- Obtain a list of all available drivers with their name and id.
SELECT driver_id, CONCAT(Drivers.fname, ' ', Drivers.lname) AS Driver FROM Drivers WHERE Drivers.available=1;


-- Populate data for customer drop down
SELECT CONCAT(Customers.fname, " ", Customers.lname) AS Customer, customer_id
FROM Customers;


-- Populate data for OrderStatus drop down
SELECT *
FROM OrderStatuses;


-- Update order data.
UPDATE Orders SET orderstatus_id=:inputorderStatus, 
driver_id = :inputdriver 
WHERE order_id = :inputorder; 


-- Delete an order.
DELETE FROM Orders WHERE order_id = :inputorder;



-- Order Products
---------------------------------------------


-- Add a new OrderProduct to an order.
INSERT INTO OrderProducts (order_id, product_id, quantity, unit_price, subtotal)  
VALUES (:orderproduct_order_id_input, :orderproduct_product_id_input, 
:orderproduct_quantity_input, :orderproduct_unit_price_input, 
:orderproduct_quantity_input * :orderproduct_unit_price_input); 


-- Update the associated Order's new total after a new
-- OrderProduct is inserted.
UPDATE Orders
SET Orders.total=(SELECT SUM(OrderProducts.subtotal) 
FROM OrderProducts WHERE OrderProducts.order_id=:inputorderid)
WHERE Orders.order_id=:inputorderid;


-- Display all OrderProducts and their associated products based on search filter for product id.
SELECT OrderProducts.product_id, orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
        Products.name AS Product, quantity AS Quantity, CONCAT('$', FORMAT(unit_price, 2)) AS 'Unit Price', CONCAT('$', FORMAT(subtotal,2)) AS Subtotal
        FROM  OrderProducts 
            INNER JOIN Products 
            ON Products.product_id=OrderProducts.product_id
        WHERE OrderProducts.order_id=:inputorderid;


-- Display all OrderProducts and their associated products.
SELECT OrderProducts.product_id, orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
        Products.name AS Product, quantity AS Quantity, CONCAT('$', FORMAT(unit_price, 2)) AS 'Unit Price', CONCAT('$', FORMAT(subtotal,2)) AS Subtotal
        FROM  OrderProducts 
            INNER JOIN Products 
            ON Products.product_id=OrderProducts.product_id;


-- Obtain all Products for dropdowns.
SELECT * FROM Products;


-- Obtain all Orders for dropdowns.
SELECT * FROM Orders;


-- Select values based on OrderProducts and Products
SELECT orderproduct_id, order_id, Products.name, quantity, unit_price, subtotal
            FROM  OrderProducts 
                INNER JOIN Products 
                ON Products.product_id=OrderProducts.product_id;


-- Delete an OrderProduct.
DELETE
FROM OrderProducts
WHERE :delete_orderproduct_id=orderproduct_id;


-- Update an OrderProduct
UPDATE OrderProducts 
SET order_id=:order_id_selected_from_dropdown_input, 
product_id=:product_id_selected_from_dropdown_input, quantity=:input_quantity, 
unit_price=:input_unit_price, subtotal=:input_subtotal 
WHERE orderproduct_id=:update_orderproduct_id; 


-- Update an Order's total based on updated OrderProduct lines associated with that order.
UPDATE Orders
    SET Orders.total=(SELECT SUM(OrderProducts.subtotal) 
    FROM OrderProducts WHERE OrderProducts.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=:orderproduct))
    WHERE Orders.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=:inputorderproduct);
