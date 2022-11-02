/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT =57205;

// Database
var db = require('./database/db-connector');

// Handlebars
// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/
// app.js

// app.js


app.get('/', function (req, res) 
    {res.render('index');});


app.get('/customers', function(req, res)
    {  
        // Declare Query 1 - Customers
        let query1;

        if (req.query.lname === undefined)

        {
            query1 = "SELECT * FROM Customers;";               // Define our query
        }
        
        else 
        {
            query1 = `SELECT * FROM Customers WHERE lname LIKE "${req.query.lname}%";`
        }

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let customer = rows;

            res.render('customers', {data: customer});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query                                  

// app.js

app.post('/customers/:add-person-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let address2 = parseInt(data.address2)
    if (isNaN(address2))
    {
        address2 = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (fname, lname, phone, address1, address2, city, state, zipcode, country) VALUES ('${data.fname}', '${data.lname}', '${data.phone}', '${data.address1}', '${address2}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.country}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Drivers

app.get('/drivers', function(req, res)
    {  
        // Declare Query 1 - Customers
        let query1;
        if (req.query.lname === undefined)
        {
            query1 = "SELECT * FROM Drivers;";               // Define our query
        }
        else 
        {
            query1 = `SELECT * FROM Drivers WHERE lname LIKE "${req.query.lname}%"`
        }
        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let driver = rows;
            res.render('drivers', {data: driver});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query                                  

app.post('/drivers/:add-person-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Drivers (fname, lname, phone, available) VALUES ('${data.fname}', '${data.lname}', '${data.phone}', '${data.available}')`;
        db.pool.query(query1, function(error, rows, fields){
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Customers
                query2 = `SELECT * FROM Drivers;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.get('/products', function(req, res)
    {  
        // Declare Query 1 - Customers
        let query1;

        if (req.query.name === undefined)

        {
            query1 = "SELECT * FROM Products;";               // Define our query
        }
        
        else 
        {
            query1 = `SELECT * FROM Products WHERE name LIKE "${req.query.name}%"`
        }

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let product = rows;

            res.render('products', {data: product});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query                                  

app.post('/products/:add-product-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Products (name, description, price, stock) VALUES ('${data.name}', '${data.description}', '${data.price}', '${data.stock}')`;
        db.pool.query(query1, function(error, rows, fields){
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Customers
                query2 = `SELECT * FROM Products;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });


app.get('/orderStatuses', function(req, res)
    {  
        // Declare Query 1 - Customers
        let query1 = `SELECT * FROM OrderStatuses;`
        

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let orderStatus = rows;

            res.render('orderStatuses', {data: orderStatus});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });     


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
                // If there was no error, perform a SELECT * on Customers
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


app.get('/orders', function(req, res){
    
    let query1 = `SELECT order_id AS 'Order ID', DATE_FORMAT(order_date, '%c-%d-%Y') AS 'Order Date', 
    Orders.address1 AS Street, Orders.address2 AS Unit, Orders.city AS City, Orders.state AS State, 
    Orders.zipcode AS 'Zip Code', Orders.country AS 'Country', total AS Total, orderstatus_id AS 'Order Status', 
    CONCAT(Drivers.fname, " ", Drivers.lname) AS Driver, CONCAT(Customers.fname, " ", Customers.lname) AS Customer 
    FROM Orders LEFT JOIN Drivers ON Drivers.driver_id=Orders.driver_id INNER JOIN Customers 
    ON Customers.customer_id=Orders.customer_id;`
    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let order = rows;
        console.log(order);
        res.render('orders', { data: order });                  // Render the index.hbs file, and also send the renderer
    })                                                           // an object where 'data' is equal to the 'rows' we
}); 


app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
