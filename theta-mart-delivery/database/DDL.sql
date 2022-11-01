-- Group 8
-- Joseph Balaty, Xizhu Wang

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS OrderProducts;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS OrderStatuses;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Drivers;
DROP TABLE IF EXISTS Products;


CREATE TABLE Customers (
  customer_id int NOT NULL UNIQUE AUTO_INCREMENT,
  fname varchar(50) NOT NULL,
  lname varchar(50) NOT NULL,
  phone char(10) NOT NULL,
  address1 varchar(50) NOT NULL,
  address2 varchar(50),
  city varchar(17) NOT NULL,
  state varchar(2) NOT NULL,
  zipcode char(5) NOT NULL,
  country varchar(50) NOT NULL,
  PRIMARY KEY (customer_id)
);

INSERT INTO Customers (customer_id, fname, lname, phone, address1, address2, city, state, zipcode, country) VALUES
(1, 'George', 'Burger', '7257491236', '123 Easy St', NULL, 'Las Vegas', 'NV', '88901', 'US'),
(2, 'Alice', 'Hill', '7025673216', '8793 Dirac Ln', 'Apt 12', 'Las Vegas', 'NV', '88901', 'US'),
(3, 'Fred', 'Flintstone', '7759019123', '2910 Singularity Dr', 'Unit 3', 'Las Vegas', 'NV', '88901', 'US');


CREATE TABLE Drivers (
  driver_id int NOT NULL UNIQUE AUTO_INCREMENT,
  fname varchar(50) NOT NULL,
  lname varchar(50) NOT NULL,
  phone char(10) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (driver_id)
);

INSERT INTO Drivers (driver_id, fname, lname, phone, available) VALUES
(1, 'Amil', 'Forenso', '7026789212', 1),
(2, 'Ihsan', 'Akbar', '7758301238', 0),
(3, 'Abraham', 'Storm', '7027381238', 0),
(4, 'Leaf', 'Wizard', '7257382712', 0),
(5, 'King', 'Dede', '7259209283', 0);


CREATE TABLE Products (
  product_id int NOT NULL UNIQUE AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  description varchar(250) NOT NULL,
  price decimal(6,2) NOT NULL,
  stock int NOT NULL DEFAULT 0,
  PRIMARY KEY (product_id)
);

INSERT INTO Products (product_id, name, description, price, stock) VALUES
(1, 'Transdimensional Window Cleaner', 'Removes stains and sends them into the void.', '5.00', 80),
(2, 'Pet Avocado', 'Avocado that purs and nuzzles like a cat.', '10.00', 120),
(3, 'Jelly Water Bottle', 'Jelly shaped like a water bottle.', '80.00', 30),
(4, 'Lemons with eyeballs', 'Lemons which stare at you.', '15.00', 48),
(5, 'Cereal Pillow', 'Pillow shaped like a cereal boxe.', '40.00', 5);



CREATE TABLE OrderStatuses (
  orderstatus_id varchar(50) NOT NULL UNIQUE,
  description varchar(10000) NOT NULL,
  PRIMARY KEY (orderstatus_id)
);

INSERT INTO OrderStatuses (orderstatus_id, description) VALUES
('Delivered', 'Driver has successfully delivered the order at the customer\'s address.'),
('In Transit', 'Driver has obtained the order items and is on his way to the customer\'s house for deliver.'),
('Pending', 'Order has been made, but no drivers are available. Status will update when a driver is available to deliver the order.'),
('Preparing Order', 'Order is being gathered by our employees. Once the order has been gathered, status will update.');


CREATE TABLE Orders (
  order_id int NOT NULL UNIQUE AUTO_INCREMENT,
  order_date date NOT NULL,
  address1 varchar(50) NOT NULL,
  address2 varchar(50),
  city varchar(17) NOT NULL,
  state varchar(2) NOT NULL,
  zipcode char(5) NOT NULL,
  country varchar(50) NOT NULL,
  total decimal(6,2) NOT NULL,
  orderstatus_id varchar(50) NOT NULL,
  driver_id int,
  customer_id int NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (orderstatus_id) REFERENCES OrderStatuses (orderstatus_id) ON DELETE CASCADE,
  FOREIGN KEY (driver_id) REFERENCES Drivers (driver_id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES Customers (customer_id) ON DELETE CASCADE
);


INSERT INTO Orders (order_id, order_date, address1, address2, city, state, zipcode, country, total, orderstatus_id, driver_id, customer_id) VALUES
(1, '2022-10-16', '123 Easy St', NULL, 'Las Vegas', 'NV', '88901', 'US', '80', 'Preparing Order', 2, 1),
(2, '2022-10-16', '8793 Dirac Ln', 'Apt 12', 'Las Vegas', 'NV', '88901', 'US', '120', 'In Transit', 3, 2),
(3, '2022-10-12', '4533 Hiney Road', NULL, 'Las Vegas', 'NV', '88901', 'US', '250', 'Delivered', 2, 2),
(4, '2022-09-09', '2910 Singularity Dr', 'Unit 3', 'Las Vegas', 'NV', '88901', 'US', '55', 'Delivered', 4, 3),
(5, '2022-10/16', '123 Easy St', NULL, 'Las Vegas', 'NV', '88901', 'US', '40', 'Pending', NULL, 1);



CREATE TABLE OrderProducts (
  orderproduct_id int NOT NULL UNIQUE AUTO_INCREMENT,
  order_id int NOT NULL,
  product_id int NOT NULL,
  quantity int(100) NOT NULL,
  unit_price decimal(6,2) NOT NULL,
  subtotal decimal(6,2) NOT NULL,
  PRIMARY KEY (orderproduct_id),
  FOREIGN KEY (order_id) REFERENCES Orders (order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products (product_id) ON DELETE CASCADE
);

INSERT INTO OrderProducts (orderproduct_id, order_id, product_id, quantity, unit_price, subtotal) VALUES
(1, 1, 1, 2, '40.00', '80.00'),
(2, 1, 3, 1, '80.00', '80.00'),
(3, 2, 4, 4, '10.00', '40.00'),
(4, 3, 4, 5, '5.00', '25.00'),
(5, 4, 2, 1, '15.00', '15.00');



SET FOREIGN_KEY_CHECKS=1;
SET AUTOCOMMIT=1;