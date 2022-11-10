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
SELECT * FROM Customers;

-- Searches for a customer based on their last name.
SELECT * FROM Customers WHERE lname LIKE :inputlastname;


-- Displays a customer's information in the update form.
SELECT customer_id AS 'Customer ID', fname AS 'First Name',  
lname AS 'Last Name', phone AS Phone, address1 AS Street, 
address2 AS Unit, city AS City, 
state AS State, zipcode AS 'Zip Code', 
country AS Country 
FROM Customers; 
WHERE 'Customer ID'=:update_customer_id;

-- Updates a customer's information.
UPDATE Customers 
SET fname=:input_customer_fname, 
lname=:input_customer_lname, phone=:input_customer_phone, 
address1=:input_customer_address1, address2=:input_customer_address2, 
city=:input_customer_city, state=:input_customer_state, 
zipcode=:input_customer_zipcode, country=:input_customer_country
WHERE customer_id=:update_customer_id; 



-- Drivers
---------------------------------------------

-- Adds a new driver.
INSERT INTO Drivers (fname, lname, phone, available) 
VALUES (:driver_fname_input, :driver_lname_input, 
:driver_phone_input, driver_available_input); 


-- Retrieves all drivers.
SELECT driver_id, fname, lname, 
phone, IF(available=0, "No", "Yes") AS available
FROM Drivers; 

-- Retrieves all drivers based on last name entered.
SELECT driver_id, fname, lname, phone, IF(available=0, 'No', 'Yes')  AS available
        FROM Drivers 
        WHERE lname LIKE :input_lname;


-- Display a driver's name in the delete form.
SELECT driver_id, CONCAT(fname, ' ', lname) AS Name
FROM Drivers
WHERE driver_id=:delete_driver_id;

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
SELECT product_id AS 'Product ID', name AS Name, description AS Description, 
price AS Price, stock AS Stock 
FROM Products;

-- Another Display all products
SELECT * FROM Products;

-- Display products based on name filter.
SELECT * FROM Products WHERE name LIKE :inputname;


-- Display Product's information for the product form.
SELECT product_id, name, description, price, stock 
FROM Products 
WHERE product_id=:update_product_id; 

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


-- Display data for OrderStatus to update.
SELECT orderstatus_id, description 
FROM OrderStatuses 
WHERE orderstatus_id=:update_orderstatus_id; 

-- Update OrderStatus.
UPDATE OrderStatuses 
SET name=:input_orderstatus_id, description=:input_orderstatus_description 
WHERE product_id=:update_product_id; 


-- Orders
---------------------------------------------


-- Add a new order.
INSERT INTO Orders (order_date, address1, address2, city, state, 
zipcode, country, total, orderstatus_id, driver_id,  customer_id) 
VALUES (:input_orders_orderdate, :input_orders_address1, :input_orders_address2, 
:input_orders_city, :input_orders_zipcode, :input_orders_country, 
:input_orders_total, :input_orders_orderstatus_id, :input_orders_driver_id, 
:input_orders_customer_id);

DELETE FROM Orders WHERE order_id =:inputid;


-- Display all orders.
SELECT order_id AS 'Order ID', DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
    Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
    Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', total AS Total, orderstatus_id AS 'Order Status', 
    CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver, CONCAT(Customers.fname, " ", Customers.lname) AS Customer 
    FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
    ON Customers.customer_id=Orders.customer_id;

-- Another way to display all orders.
SELECT * FROM Orders;


-- Display data for an order to be updated.
SELECT order_id AS 'Order ID', order_date AS 'Order Date', Orders.address1 AS Street, Orders.address2 AS Unit,
 Orders.city AS City, Orders.state AS State, Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', total AS Total, 
orderstatus_id AS 'Order Status', CONCAT(Drivers.fname,
" ", Drivers.lname) AS Driver, CONCAT(Customers.fname, " ", Customers.lname) AS Customer
FROM Orders 
WHERE order_id=:update_order_id; 

-- Displays driver's name for the Add Order form.
SELECT driver_id, CONCAT(Drivers.fname, ' ', Drivers.lname) AS Driver FROM Drivers WHERE Drivers.available=1;

-- Populate data for the driver drop down where the Driver is in available or the driver is already selected.
SELECT CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver, driver_id, available
FROM Drivers
WHERE (NOT available=0) OR driver_id=:update_driver_id;

-- Populate data for customer drop down
SELECT CONCAT(fname, " ", Customers.lname) AS Customer, customer_id
FROM Customers;

-- Populate data for OrderStatus drop down
SELECT orderstatus_id
FROM OrderStatuses;

-- Update order data.
UPDATE Orders 
SET name=: order_date=:input_orders_orderdate, address1=:input_orders_address1, 
address2=:input_orders_address2, city=:input_orders_city, 
state=:input_orders_state, zipcode=:input_orders_zipcode, 
country=:input_orders_country, total=:input_orders_total, 
orderstatus_id=:input_orders_orderstatus_id, driver_id=:input_orders_driver_id,  
customer_id=:input_orders_customer_id 
WHERE order_id=:update_order_id; 


-- Order Products
---------------------------------------------


-- Add a new OrderProduct to an order.
INSERT INTO OrderProducts (order_id, product_id, quantity, unit_price, subtotal)  
VALUES (:orderproduct_order_id_input, :orderproduct_product_id_input, 
:orderproduct_quantity_input, :orderproduct_unit_price_input, 
:orderproduct_subtotal_calculation); 


-- Display all OrderProducts based on search filter for product id.
SELECT orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
    Products.name AS Product, quantity AS Quantity, unit_price AS 'Unit Price', subtotal AS Subtotal
    FROM  OrderProducts 
        INNER JOIN Products 
        ON Products.product_id=OrderProducts.product_id 
    WHERE orderproduct_id=:update_orderproduct_id;


-- Display all values.
SELECT orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
        Products.name AS Product, quantity AS Quantity, unit_price AS 'Unit Price', subtotal AS Subtotal
        FROM  OrderProducts 
            INNER JOIN Products 
            ON Products.product_id=OrderProducts.product_id
        WHERE OrderProducts.order_id=:inputorderid;


-- Select values based on OrderProducts and Products
SELECT orderproduct_id, order_id, Products.name, quantity, unit_price, subtotal
            FROM  OrderProducts 
                INNER JOIN Products 
                ON Products.product_id=OrderProducts.product_id;

-- Delete an OrderProduct.
DELETE
FROM OrderProducts
WHERE :delete_orderproduct_id=orderproduct_id;


-- Display an OrderProduct to update.
SELECT orderproduct_id, order_id, 
Products.name AS Product, quantity AS Quantity, unit_price AS 'Unit Price', subtotal AS 'Subtotal'
FROM  OrderProducts 
	INNER JOIN Products 
	ON Products.product_id=OrderProducts.product_id 
WHERE orderproduct_id=:update_orderproduct_id; 


-- Update an OrderProduct
UPDATE OrderProducts 
SET order_id=:order_id_selected_from_dropdown_input, 
product_id=:product_id_selected_from_dropdown_input, quantity=:input_quantity, 
unit_price=:input_unit_price, subtotal=:input_subtotal 
WHERE orderproduct_id=:update_orderproduct_id; 

-- Update an Order's total based on updated OrderProduct lines.
UPDATE Orders
    SET Orders.total=(SELECT SUM(OrderProducts.subtotal) 
    FROM OrderProducts WHERE OrderProducts.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=:orderproduct))
    WHERE Orders.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=:orderproduct);
