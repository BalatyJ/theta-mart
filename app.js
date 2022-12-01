/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
PORT = 57206;

// Database
var db = require('./database/db-connector');

// Handlebars
// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/
// app.js



app.get('/', function (req, res) { res.render('index'); });



// CUSTOMERS


// Customers - get
app.get('/customers', function (req, res) {
    // Declare Query 1 - Customers
    let getCustomersQuery;

    // If no search filter is included, we retrieve all Customers.
    if (req.query.lname === undefined) {
        getCustomersQuery = `SELECT customer_id, fname, lname, 
        CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
        address1, address2, city, state, zipcode, country FROM Customers;`;
    }

    else {
        // Otherwise we use the filter to retrieve only customers with a similar last name.
        getCustomersQuery = `SELECT customer_id, fname, lname, 
        CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
        address1, address2, city, state, zipcode, country
        FROM Customers WHERE lname LIKE "${req.query.lname}%";`
    }

    // Run the 1st query
    db.pool.query(getCustomersQuery, function (error, rows, fields) {    // Execute the query

        let customer = rows;

        // Render customers page with the retreived data.
        res.render('customers', { data: customer });
    })
});

// Customers - create
app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let address2 = data.address2
    // If the value is blank, we use NULL in our query.
    if (address2 === '') {
        address2 = 'NULL'
    }

    // Create the query and run it on the database
    newCustomerQuery = `INSERT INTO Customers (fname, lname, phone, address1, address2, city, state, zipcode, country) VALUES ('${data.fname}', '${data.lname}', '${data.phone}', '${data.address1}', '${address2}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.country}')`;
    db.pool.query(newCustomerQuery, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // Otherwise request is successful.
            res.sendStatus(201);
        }
    })
}
);

// Customers - update
app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;

    let queryUpdateCustomer = `UPDATE Customers SET fname= ?, lname= ?, phone= ?, address1= ?, address2= ?, city= ?, state= ?, zipcode= ?, country= ? WHERE customer_id= ?;`;

    // Run query to update customer.
    db.pool.query(queryUpdateCustomer, [data['fname'], data['lname'], data['phone'], data['address1'], data['address2'], data['city'], data['state'], data['zipcode'], data['country'], data['customer_id']], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {

            // Otherwise request is successful.
            res.sendStatus(200);
        }
    }
    );
});

// Customers - delete
app.delete('/customers/:delete-customer-ajax', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomers = `DELETE FROM Customers WHERE customer_id = ?;`;


    // Run query to delete the selected customer.
    db.pool.query(deleteCustomers, [customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {

            // Otherwise request is successful.
            res.sendStatus(204);
        }
    })
});



// DRIVERS


// Drivers - get
app.get('/drivers', function (req, res) {
    // Declare Query 1 - display Drivers
    let displayDriversQuery;
    // If no filter was used, we retrieve all Drivers.
    if (req.query.lname === undefined || req.query.lname === '') {
        displayDriversQuery = `SELECT driver_id, fname, lname, 
        CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
        IF(available=0, 'No', 'Yes') AS available, available AS Available FROM Drivers;`
    }
    else {
        // Otherwise we retrieve Drivers based on the last name entered in the search field.
        displayDriversQuery = `SELECT driver_id, fname, lname, 
        CONCAT(SUBSTRING(phone, 1, 3), "-", SUBSTRING(phone, 4, 3), "-", SUBSTRING(phone, 7,4)) AS phone, 
        IF(available=0, 'No', 'Yes') AS available, available AS Available
        FROM Drivers 
        WHERE lname LIKE "%${req.query.lname}%"`
    }
    // Run the display Drivers query.
    db.pool.query(displayDriversQuery, function (error, rows, fields) {
        let driver = rows;
        res.render('drivers', { data: driver });
    })
});

// Drivers - create
app.post('/add-driver-ajax', function (req, res) {
    let data = req.body;

    // Create the query and run it on the database
    newDriverQuery = `INSERT INTO Drivers (fname, lname, phone, available) VALUES ('${data.fname}', '${data.lname}', '${data.phone}', '${data.available}')`;
    db.pool.query(newDriverQuery, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {

            // Otherwise request is successful.
            res.sendStatus(201);
        }
    })
}
);


// Drivers - update
app.put('/put-driver-ajax', function (req, res, next) {
    let data = req.body;

    // Establish query to update the Driver's name, phone number, availability based on the driver selected in the update form.
    let queryUpdateDriver = `UPDATE Drivers SET fname = ?, lname = ?, phone =?, available = ? WHERE driver_id = ?;`;

    // Run queryUpdateDriver using the values that were passed from the update form.
    db.pool.query(queryUpdateDriver, [data['fname'], data['lname'], data['phone'], data['available'], data['driver_id']], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Otherwise the request was successful.
            res.sendStatus(200);
        }
    }
    );
});


// Drivers - delete
app.delete('/delete-driver-ajax', function (req, res, next) {
    let data = req.body;

    // Convert the driverID from a string to integer.
    let driverID = parseInt(data.id);
    // Establish the query to delete a driver.
    let deleteDrivers = `DELETE FROM Drivers WHERE driver_id = ?;`;

    // Execute query.
    db.pool.query(deleteDrivers, [driverID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Otherwise the request was successful.
            res.sendStatus(204);
        }
    })

});



// PRODUCTS


// Products - display all Products or display based on filter.
app.get('/products', function (req, res) {
    let query1;

    // If no product name was entered, we set the query to return all Products.
    if (req.query.name === undefined) {
        query1 = "SELECT product_id, name, description, CONCAT('$', FORMAT(price,2)) as price, stock FROM Products;";
    }


    else {
        // Otherwise the query will return products that are similar to the name entered in the search field.
        query1 = `SELECT product_id, name, description, CONCAT('$', FORMAT(price,2)) as price, stock FROM Products WHERE name LIKE "%${req.query.name}%"`
    }

    // Execute the query at our database.
    db.pool.query(query1, function (error, rows, fields) {

        let product = rows;

        // Render our products page with the retrieved data.
        res.render('products', { data: product });
    })
});

// Products - create
app.post('/products/:add-product-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    displayProductsQuery = `INSERT INTO Products (name, description, price, stock) VALUES ('${data.name}', '${data.description}', '${data.price}', '${data.stock}')`;
    db.pool.query(displayProductsQuery, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // Otherwise the request was successful and we send a successful response back.
            res.sendStatus(201);
        }
    })
}
);

// Products - update
app.put('/products/put-product-ajax', function (req, res, next) {
    let data = req.body;
    console.log(data.product)

    // Establish our variables and parse them to be compatible with our database.
    let product = data.product;
    let description = data.description;
    let price = parseFloat(data.price);
    let stock = parseInt(data.stock);

    let queryUpdateProduct = `UPDATE Products SET description = ?, price = ?, stock = ? WHERE product_id = ?`;

    // Execute query to update a product based on the selected product_id..
    db.pool.query(queryUpdateProduct, [description, price, stock, product], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {

            // Otherwise the request was successful and we send a successful response back.
            res.sendStatus(200);
        }
    })
});

// Products - delete
app.delete('/delete-product-ajax/', function (req, res, next) {
    let data = req.body;
    // Establish data and query to be executed.
    let productID = data.id;
    let deleteProduct = `DELETE FROM Products WHERE product_id = ?;`;

    // Execute query to delete a product based on the product id.
    db.pool.query(deleteProduct, [productID], function (error, rows, fields) {
        if (error) {

            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }

    })
});



// ORDERSTATUSES


// Order Status - get
app.get('/orderStatuses', function (req, res) {
    // Declare query to update OrderStatuses.
    let orderStatusesQuery = `SELECT * FROM OrderStatuses;`


    // Run the orderStatusesQuery
    db.pool.query(orderStatusesQuery, function (error, rows, fields) {    // Execute the query

        let orderStatus = rows;

        // Send a response back to render orderStatuses with the retreived data.
        res.render('orderStatuses', { data: orderStatus });
    })
});


// Order Status - create
app.post('/orderStatuses/:add-orderStatus-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let newOrderStatus = `INSERT INTO OrderStatuses (orderstatus_id, description) VALUES ('${data.orderstatus_id}', '${data.description}')`;
    db.pool.query(newOrderStatus, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // Request was successful and we send a successful response back.
            res.sendStatus(201);
        }
    })
}
);


// Order Status - update
app.put('/orderStatuses/:put-orderStatus-ajax', function (req, res, next) {
    let data = req.body;
    // Declare our query.
    let queryUpdateOrderStatus = `UPDATE OrderStatuses SET description = ? WHERE orderstatus_id = ?`;

    // Execute query.
    db.pool.query(queryUpdateOrderStatus, [data['description'], data['orderstatus_id']], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // On a successful query, we return a successful response back.
            res.sendStatus(200);
        }
    }
    );
});

// Order Status - delete
app.delete('/delete-orderStatus-ajax/', function (req, res, next) {

    // Declare our variables and query.
    let data = req.body;
    let statusID = data.id;
    let deleteOrderStatus = `DELETE FROM OrderStatuses WHERE orderstatus_id = ?;`;


    // Execute query.
    db.pool.query(deleteOrderStatus, [statusID], function (error, rows, fields) {
        if (error) {
            // If an error was found, we return an error code back.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Otherwise we return a successful response.
            res.sendStatus(204);
        }

    })
});



// ORDERS


// Orders - get
app.get('/orders', function (req, res) {
    // Declare our queries. If a value was entered in our search field, we filter our results based on that value.

    let displayOrdersQuery = `SELECT order_id AS OrderID, CONCAT(Customers.fname, " ", Customers.lname) AS Customer, DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
    Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
    Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', CONCAT('$', FORMAT(total, 2)) AS Total, orderstatus_id AS 'Order Status', 
    CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver, Drivers.driver_id
    FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
    ON Customers.customer_id=Orders.customer_id WHERE CONCAT(Customers.fname, " ", Customers.lname) LIKE "%${req.query.customer_name}%" ORDER BY OrderID ASC;`


    // If no value was put in the search field, we return all Orders.
    if (req.query.customer_name === undefined || req.query.customer_name === '') {
        displayOrdersQuery = `SELECT order_id AS OrderID, CONCAT(Customers.fname, " ", Customers.lname) AS Customer, DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
        Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
        Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', CONCAT('$', FORMAT(total, 2)) AS Total, orderstatus_id AS 'Order Status', 
        CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver, Drivers.driver_id
        FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
        ON Customers.customer_id=Orders.customer_id ORDER BY OrderID ASC;`
    }

    // We retrieve data to use for our FK dropdowns for our Create and Update forms.
    let driversQuery = "SELECT driver_id, CONCAT(Drivers.fname, ' ', Drivers.lname) AS Driver FROM Drivers WHERE Drivers.available=1;"
    let orderStatusesQuery = "SELECT * FROM OrderStatuses"
    let customersQuery = "SELECT CONCAT(Customers.fname, ' ', Customers.lname) AS Customer, customer_id FROM Customers;"


    // Start with our Orders query, and then execute the rest of the queries while storing all their
    // results in variables.
    db.pool.query(displayOrdersQuery, function (error, rows, fields) {

        let order = rows;

        db.pool.query(driversQuery, function (error, rows, fields) {
            let drivers = rows;

            db.pool.query(orderStatusesQuery, function (error, rows, fields) {

                let orderstatuses = rows;

                db.pool.query(customersQuery, function (error, rows, fields) {

                    let customers = rows;

                    // Once all wanted data is obtained, we return them and render the orders page with that data.
                    return res.render('orders', { data: order, drivers: drivers, orderstatuses: orderstatuses, customers: customers });
                })
            })
        })

    })
});



// Orders - create
app.post('/add-order-ajax', function (req, res) {
    // Declare our variables for our data and query.
    let data = req.body;
    let newOrderQuery;

    // If no driver was selected, let driver_id be null. 
    if (data.driverid === '') {
        newOrderQuery = `INSERT INTO Orders (customer_id, order_date, address1, address2, city, state, zipcode, country, total, orderstatus_id, driver_id) 
    VALUES ('${data.customerid}', '${data.orderdate}', '${data.street}', '${data.unit}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.country}', 0, 
    '${data.orderstatusid}', NULL)`
    }

    else {
        // Otherwise set the driver id to selected value.
        newOrderQuery = `INSERT INTO Orders (customer_id, order_date, address1, address2, city, state, zipcode, country, total, orderstatus_id, driver_id) 
    VALUES ('${data.customerid}', '${data.orderdate}', '${data.street}', '${data.unit}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.country}', 0, 
    '${data.orderstatusid}', ${data.driverid} )`;
    }

    // Execute the query to insert a new order.
    db.pool.query(newOrderQuery, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // Otherwise the request was successful, so we send back a successful response.
            res.sendStatus(201);
        }
    })
}
);



// Orders - delete
app.delete('/delete-order-ajax/', function (req, res, next) {
    // Declare our variables and query.
    let data = req.body;
    let orderID = parseInt(data.id);

    // Query is to delete the order with the selected order_id.
    let deleteOrder = `DELETE FROM Orders WHERE order_id = ?;`;


    db.pool.query(deleteOrder, [orderID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Request was successful, so we send back a successful response.
            res.sendStatus(204);
        }
    })
}
);


// Orders - update
app.put('/orders/:put-order-ajax', function (req, res, next) {

    // Declare our variables and parse so they're the right type.
    let data = req.body;

    let order = parseInt(data.order_id);
    let driver = data.driver_id;
    let orderStatus = data.orderstatus_id;


    // Declare our query where an Order's attributes are updated based on the order that was selected in the Update form.
    let queryUpdateOrder = `UPDATE Orders SET orderstatus_id = '${orderStatus}', driver_id = ${driver} WHERE order_id = ${order};`;

    // Execute our query.
    db.pool.query(queryUpdateOrder, function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Sends back a successful response.
            res.sendStatus(200);
        }
    })
}
);



// ORDER PRODUCTS


// Order Products - get
app.get('/orderProducts?', function (req, res) {
    // Declare query.
    let displayOrderProductsQuery

    // If there was no orderid selected in the search field, we return all OrderProducts.
    if (req.query.orderid === undefined || req.query.orderid === '') {

        displayOrderProductsQuery = `SELECT OrderProducts.product_id, orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
        Products.name AS Product, quantity AS Quantity, CONCAT('$', FORMAT(unit_price, 2)) AS 'Unit Price', CONCAT('$', FORMAT(subtotal,2)) AS Subtotal
        FROM  OrderProducts 
            INNER JOIN Products 
            ON Products.product_id=OrderProducts.product_id;`
    }
    else {
        // If a order id was selected in the search field, we return all OrderProducts that have that order id as a foriegn key. 
        displayOrderProductsQuery = `SELECT OrderProducts.product_id, orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
        Products.name AS Product, quantity AS Quantity, CONCAT('$', FORMAT(unit_price, 2)) AS 'Unit Price', CONCAT('$', FORMAT(subtotal,2)) AS Subtotal
        FROM  OrderProducts 
            INNER JOIN Products 
            ON Products.product_id=OrderProducts.product_id
        WHERE OrderProducts.order_id=${req.query.orderid};`
    }

    // We retrieve data from Products and Orders for dropdowns for our search field, 
    // update form and create form to render our page with.
    let productsQuery = `SELECT * FROM Products;`
    let ordersQuery = `SELECT * FROM Orders;`

    // Execute each of our queries and store their results in variables.
    db.pool.query(displayOrderProductsQuery, function (error, rows, fields) {

        let orderproducts = rows;

        db.pool.query(productsQuery, function (error, rows, fields) {
            let product_rows = rows;

            db.pool.query(ordersQuery, function (error, rows, fields) {
                let order_ids = rows;

                // Once we've obtained all needed data, we send back a response to render the orderProducts page with the retrieved data.
                res.render('orderProducts', { data: orderproducts, products: product_rows, orders: order_ids });

            })


        })
    })
});


// Order Products - create
app.post('/add-orderproduct-ajax', function (req, res) {
    // Parse the data retreived from our create form to variables to use with a query.
    let data = req.body;
    let orderid = parseInt(data.orderid)
    let productid = parseInt(data.productid)
    let quantity = parseInt(data.quantity)
    let unitprice = parseFloat(data.unitprice)


    // Declare query with the values obtained from the create form. 
    // Subtotal is a calculation of the price per unit of the product times the quantity being purchased.
    newOrderProductQuery = `INSERT INTO OrderProducts 
    (order_id, product_id, quantity, unit_price, subtotal) 
    VALUES ('${orderid}', '${productid}',${quantity}, ${unitprice},${unitprice * quantity});`;


    // Execute query.
    db.pool.query(newOrderProductQuery, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, update the total attribute in Orders to the new amount for our order.
            updateOrdersTotalQuery = `UPDATE Orders
            SET Orders.total=(SELECT SUM(OrderProducts.subtotal) 
            FROM OrderProducts WHERE OrderProducts.order_id='${orderid}')
            WHERE Orders.order_id='${orderid}';`

            // Execute query.
            db.pool.query(updateOrdersTotalQuery, function (error, rows, fields) {


                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    // Sends a successful response back.
                    res.sendStatus(201);
                }
            })
        }
    })
}
);


// Order Products - update    
app.put('/put-update-orderproduct-ajax', function (req, res, next) {

    // Declare our variables for the data we'll be using and parse them so we can use them in our queries.
    let data = req.body;

    let orderproduct = parseInt(data.orderproductid);
    let product = parseInt(data.productid);
    let quantity = parseInt(data.quantity);
    let price = parseFloat(data.unitprice);
    let subtotal = parseFloat((quantity * price).toFixed(2))

    // Declare query to update an OrderProduct based on the selected orderproduct id from OrderProduct's update form.
    let queryUpdateProduct = `UPDATE OrderProducts SET product_id = ?, quantity=?, unit_price=?, subtotal=?  WHERE orderproduct_id = ?`;

    // Declare following query to update the corresponding Order's total attribute to the sum of the subtotals of the Order's OrderProducts.
    let updateOrderTotal = `UPDATE Orders
    SET Orders.total=(SELECT SUM(OrderProducts.subtotal) 
    FROM OrderProducts WHERE OrderProducts.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=${orderproduct}))
    WHERE Orders.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=${orderproduct});`


    // Runs the query to update the OrderProduct.
    db.pool.query(queryUpdateProduct, [product, quantity, price, subtotal, orderproduct], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query to update the Order's Total attribute.
        else {

            db.pool.query(updateOrderTotal, function (error, rows, fields) {
                if (error) {
                    // If there's an error, log it and return an error code.
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // If successful return a successful response.
                    res.sendStatus(200);
                }
            })
        }
    })
}
);

// Order Products - delete
app.delete('/delete-orderproduct-ajax/', function (req, res, next) {
    // Declare our variables and parse OrderID to use with our query.
    let data = req.body;
    let productOrderID = parseInt(data.id);

    // Declare query to delete an OrderProduct based on the selected OrderProduct ID.
    let deleteOrderProduct = `DELETE FROM OrderProducts WHERE orderproduct_id = ?;`;



    // Run the query.
    db.pool.query(deleteOrderProduct, [productOrderID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Otherwise send back a successful response.
            res.sendStatus(204);
        }

    })
});

// Data reload
// code reference to mysql-import 
const host = 'classmysql.engr.oregonstate.edu';
const user = 'cs340_balatyj';
const password = '9338';
const database = 'cs340_balatyj';


const Importer = require('mysql-import');
const importer = new Importer({ host, user, password, database });


// Reimports the DDL.sql file when reload.hbs is accessed, so the database is refreshed.
app.get('/reload', function (req, res) {
    res.render('reload');
    importer
        .import('./database/DDL.sql')
        .then(() => {
            let files_imported = importer.getImported();
            console.log(`${files_imported.length} SQL file(s) imported.`);
        })
        .catch((err) => {
            console.error(err);
        });
});


app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
