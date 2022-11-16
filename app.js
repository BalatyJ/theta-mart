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


// Customers - get
app.get('/customers', function (req, res) {
    // Declare Query 1 - Customers
    let query1;

    if (req.query.lname === undefined) {
        query1 = "SELECT * FROM Customers;";               // Define our query
    }

    else {
        query1 = `SELECT * FROM Customers WHERE lname LIKE "${req.query.lname}%";`
    }

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let customer = rows;

        res.render('customers', { data: customer });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query                                  

// Customers - insert
app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let address2 = parseInt(data.address2)
    if (isNaN(address2)) {
        address2 = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (fname, lname, phone, address1, address2, city, state, zipcode, country) VALUES ('${data.fname}', '${data.lname}', '${data.phone}', '${data.address1}', '${address2}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.country}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Customers - update
app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;

    let queryUpdateCustomer = `UPDATE Customers SET fname= ?, lname= ?, phone= ?, address1= ?, address2= ?, city= ?, state= ?, zipcode= ?, country= ? WHERE customer_id= ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [data['fname'], data['lname'], data['phone'], data['address1'], data['address2'], data['city'], data['state'], data['zipcode'], data['country'], data['customer_id']], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            res.send(rows);
        }
    }
    );
});

app.delete('/customers/:delete-customer-ajax', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomers = `DELETE FROM Customers WHERE customer_id = ?;`;


    // Run the 1st query
    db.pool.query(deleteCustomers, [customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
    })
});


// Drivers - get
app.get('/drivers', function (req, res) {
    // Declare Query 1 - Customers
    let query1;
    if (req.query.lname === undefined) {
        query1 = `SELECT driver_id, fname, lname, phone, IF(available=0, 'No', 'Yes') AS available FROM Drivers;`
    }
    else {
        query1 = `SELECT driver_id, fname, lname, phone, IF(available=0, 'No', 'Yes') AS available 
        FROM Drivers 
        WHERE lname LIKE "${req.query.lname}%"`
    }
    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let driver = rows;
        res.render('drivers', { data: driver });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});
// received back from the query                                  
// Drivers - insert
app.post('/add-driver-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Drivers (fname, lname, phone, available) VALUES ('${data.fname}', '${data.lname}', '${data.phone}', '${data.available}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT driver_id, fname, lname, phone, IF(available=0, "No", "Yes") AS available FROM Drivers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// Drivers - update
app.put('/put-driver-ajax', function (req, res, next) {
    let data = req.body;

    let queryUpdateDriver = `UPDATE Drivers SET fname = ?, lname = ?, phone =?, available = ? WHERE driver_id = ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateDriver, [data['fname'], data['lname'], data['phone'], data['available'], data['driver_id']], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            res.send(rows);
        }
    }
    );
});


// Drivers - delete
app.delete('/delete-driver-ajax', function (req, res, next) {
    let data = req.body;

    let driverID = parseInt(data.id);
    let deleteDrivers = `DELETE FROM Drivers WHERE driver_id = ?;`;

    // Run the 1st query
    db.pool.query(deleteDrivers, [driverID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
    })
});



// Products - get
app.get('/products', function (req, res) {
    // Declare Query 1 - Customers
    let query1;

    if (req.query.name === undefined) {
        query1 = "SELECT * FROM Products;";               // Define our query
    }

    else {
        query1 = `SELECT * FROM Products WHERE name LIKE "%${req.query.name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let product = rows;

        res.render('products', { data: product });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query                                  

// Products - insert
app.post('/products/:add-product-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (name, description, price, stock) VALUES ('${data.name}', '${data.description}', '${data.price}', '${data.stock}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Products - update
app.put('/products/put-product-ajax', function (req, res, next) {
    let data = req.body;
    console.log(data.product)

    let product = data.product;
    let description = data.description;
    let price = parseInt(data.price);
    let stock = parseInt(data.stock);

    let queryUpdateProduct = `UPDATE Products SET description = ?, price = ?, stock = ? WHERE product_id = ?`;
    let selectProducts = `SELECT * FROM Products WHERE product_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateProduct, [description, price, stock, product], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectProducts, [product], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


// Order Status - get
app.get('/orderStatuses', function (req, res) {
    // Declare Query 1 - Customers
    let query1 = `SELECT * FROM OrderStatuses;`


    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let orderStatus = rows;

        res.render('orderStatuses', { data: orderStatus });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

// Order Status - insert
app.post('/orderStatuses/:add-orderStatus-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO OrderStatuses (orderstatus_id, description) VALUES ('${data.orderstatus_id}', '${data.description}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on OrderStatuses
            query2 = `SELECT * FROM OrderStatuses;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// Order Status - update
app.put('/orderStatuses/:put-orderStatus-ajax', function (req, res, next) {
    let data = req.body;

    let queryUpdateOrderStatus = `UPDATE OrderStatuses SET description = ? WHERE orderstatus_id = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateOrderStatus, [data['description'], data['orderstatus_id']], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            res.send(rows);
        }
    }
    );
});




// Orders - get
app.get('/orders', function (req, res) {
    // Declare Query 1 - Orders

    let query1 = `SELECT order_id AS OrderID, CONCAT(Customers.fname, " ", Customers.lname) AS Customer, DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
    Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
    Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', total AS Total, orderstatus_id AS 'Order Status', 
    CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver
    FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
    ON Customers.customer_id=Orders.customer_id WHERE CONCAT(Customers.fname, " ", Customers.lname) LIKE "%${req.query.customer_name}%" ORDER BY OrderID ASC;`



    if (req.query.customer_name === undefined || req.query.customer_name === '') {
        query1 = `SELECT order_id AS OrderID, CONCAT(Customers.fname, " ", Customers.lname) AS Customer, DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
        Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
        Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', total AS Total, orderstatus_id AS 'Order Status', 
        CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver 
        FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
        ON Customers.customer_id=Orders.customer_id ORDER BY OrderID ASC;`
    }

    let query2 = "SELECT driver_id, CONCAT(Drivers.fname, ' ', Drivers.lname) AS Driver FROM Drivers WHERE Drivers.available=1;"
    let query3 = "SELECT * FROM OrderStatuses"
    let query4 = "SELECT CONCAT(Customers.fname, ' ', Customers.lname) AS Customer, customer_id FROM Customers;"

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let order = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let drivers = rows;

            db.pool.query(query3, function (error, rows, fields) {

                let orderstatuses = rows;

                db.pool.query(query4, function (error, rows, fields) {

                    let customers = rows;

                    return res.render('orders', { data: order, drivers: drivers, orderstatuses: orderstatuses, customers: customers });
                })
            })
        })

    })                                                           // an object where 'data' is equal to the 'rows' we
});



// Orders - insert
app.post('/add-order-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // If no driver was selected, let driver_id be null. Otherwise set the driver id to selected value.
    if (data.driverid === '') {
        query1 = `INSERT INTO Orders (customer_id, order_date, address1, address2, city, state, zipcode, country, total, orderstatus_id, driver_id) 
    VALUES ('${data.customerid}', '${data.orderdate}', '${data.street}', '${data.unit}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.country}', 0, 
    '${data.orderstatusid}', NULL )`
    }
    else {
        query1 = `INSERT INTO Orders (customer_id, order_date, address1, address2, city, state, zipcode, country, total, orderstatus_id, driver_id) 
    VALUES ('${data.customerid}', '${data.orderdate}', '${data.street}', '${data.unit}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.country}', 0, 
    '${data.orderstatusid}', ${data.driverid} )`;
    }
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // I'm not going to implement right now, but may after some consideration.
            // if (data.driverid !== '') {
            //     query3 = `UPDATE Drivers SET available=0 WHERE ${data.driverid}=Drivers.driver_id;`

            //     db.pool.query(query3, function (error, rows, fields) {
            //         if (error) {

            //             // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            //             console.log(error)
            //             res.sendStatus(400);
            //         }
            //     })
            // }


            query2 = `SELECT order_id AS OrderID, CONCAT(Customers.fname, " ", Customers.lname) AS Customer, DATE_FORMAT(order_date, '%c-%d-%Y') AS OrderDate, 
                Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
                Orders.zipcode AS ZipCode, Orders.country AS 'Country', total AS Total, orderstatus_id AS OrderStatus, 
                CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver 
                FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
                ON Customers.customer_id=Orders.customer_id ORDER BY OrderID ASC;`;

            db.pool.query(query2, function (error, rows, fields) {
                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});



// Orders - delete
app.delete('/delete-order-ajax/', function (req, res, next) {
    let data = req.body;
    let orderID = parseInt(data.id);
    let deleteOrderProduct = `DELETE FROM OrderProducts WHERE order_id = ?`;
    let deleteOrder = `DELETE FROM Orders WHERE order_id = ?`;


    // Run the 1st query
    db.pool.query(deleteOrderProduct, [orderID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            db.pool.query(deleteOrder, [orderID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});


// Orders - update
app.put('/orders/:put-order-ajax', function (req, res, next) {
    let data = req.body;

    let order = parseInt(data.order_id);
    let orderStatus = data.orderstatus_id;

    let queryUpdateOrder = `UPDATE Orders SET orderstatus_id = ? WHERE order_id = ?`;
    let selectOrders = `SELECT * FROM Orders WHERE order_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateOrder, [orderStatus, order], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectOrders, [orderStatus], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

// Order Products - get
app.get('/orderProducts', function (req, res) {
    // Declare Query 1 - Orders

    let query1

    if (req.query.orderid === undefined || req.query.orderid === '') {
        query1 = `SELECT OrderProducts.product_id, orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
        Products.name AS Product, quantity AS Quantity, unit_price AS 'Unit Price', subtotal AS Subtotal
        FROM  OrderProducts 
            INNER JOIN Products 
            ON Products.product_id=OrderProducts.product_id;`              // Define our query
    }
    else {
        query1 = `SELECT OrderProducts.product_id, orderproduct_id AS 'OrderProduct ID', order_id AS 'Order ID', 
        Products.name AS Product, quantity AS Quantity, unit_price AS 'Unit Price', subtotal AS Subtotal
        FROM  OrderProducts 
            INNER JOIN Products 
            ON Products.product_id=OrderProducts.product_id
        WHERE OrderProducts.order_id=${req.query.orderid};`
    }

    let query2 = `SELECT * FROM Products;`
    let query3 = `SELECT * FROM Orders;`
    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let orderproducts = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let product_rows = rows;

            db.pool.query(query3, function (error, rows, fields) {
                let order_ids = rows;
                console.log(orderproducts)
                res.render('orderProducts', { data: orderproducts, products: product_rows, orders: order_ids });                  // Render the index.hbs file, and also send the renderer

            })


        })
    })                                                           // an object where 'data' is equal to the 'rows' we
});


// Order Products - insert
app.post('/add-orderproduct-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let orderid = parseInt(data.orderid)
    let productid = parseInt(data.productid)
    let quantity = parseInt(data.quantity)
    let unitprice = parseInt(data.unitprice)
    console.log(orderid)
    // Create the query and run it on the database
    query1 = `INSERT INTO OrderProducts (order_id, product_id, quantity, unit_price, subtotal) VALUES ('${orderid}', '${productid}',${quantity}, ${unitprice},${unitprice * quantity});`;

    // Also update the total for the associated orderid to reflect the new total cost.
    reduceProductQuantity = `SELECT orderproduct_id, order_id, 
                        Products.name, quantity, unit_price, subtotal
                        FROM  OrderProducts 
                            INNER JOIN Products 
                            ON Products.product_id=OrderProducts.product_id;`;


    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT on orderproducts to show new data.
            query2 = `UPDATE Orders
            SET Orders.total=(SELECT SUM(OrderProducts.subtotal) 
            FROM OrderProducts WHERE OrderProducts.order_id='${orderid}')
            WHERE Orders.order_id='${orderid}';`
            console.log("I'm here.")

            db.pool.query(query2, function (error, rows, fields) {

                console.log("QUERY ACCOMPLISHED")
                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {

                    // Also update the total for the associated orderid to reflect the new total cost.
                    query3 = `SELECT orderproduct_id, order_id, 
            Products.name, quantity, unit_price, subtotal
            FROM  OrderProducts 
                INNER JOIN Products 
                ON Products.product_id=OrderProducts.product_id;`;

                    db.pool.query(query3, function (error, rows, fields) {

                        // If there was an error on the second query, send a 400
                        if (error) {

                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            res.send(rows);
                        }
                    })
                }
            })
        }
    })
});


// Order Products - update    
app.put('/put-update-orderproduct-ajax', function (req, res, next) {
    let data = req.body;

    let orderproduct = parseInt(data.orderproductid);
    let product = parseInt(data.productid);
    let quantity = parseInt(data.quantity);
    let price = parseInt(data.unitprice);

    let queryUpdateProduct = `UPDATE OrderProducts SET product_id = ?, quantity=?, unit_price=?, subtotal=?  WHERE orderproduct_id = ?`;
    let selectProducts = `SELECT * FROM Products WHERE product_id = ?`

    let updateOrderTotal = `UPDATE Orders
    SET Orders.total=(SELECT SUM(OrderProducts.subtotal) 
    FROM OrderProducts WHERE OrderProducts.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=${orderproduct}))
    WHERE Orders.order_id=(SELECT order_id FROM OrderProducts WHERE orderproduct_id=${orderproduct});`


    // Run the 1st query
    db.pool.query(queryUpdateProduct, [product, quantity, price, quantity * price, orderproduct], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectProducts, [product], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(updateOrderTotal, function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {

                            res.send(rows);
                        }
                    })
                }
            })
        }
    })
});

// Order Products - delete
app.delete('/delete-orderproduct-ajax/', function (req, res, next) {
    let data = req.body;
    let productOrderID = parseInt(data.id);
    let deleteOrderProduct = `DELETE FROM OrderProducts WHERE orderproduct_id = ?;`;



    // Run the 1st query
    db.pool.query(deleteOrderProduct, [productOrderID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }

    })
});




app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
