/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT =57203;

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
            query1 = `SELECT * FROM Customers WHERE lname LIKE "${req.query.lname}%"`
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
        let query3;
        if (req.query.lname === undefined)
        {
            query3 = "SELECT * FROM Drivers;";               // Define our query
        }
        else 
        {
            query3 = `SELECT * FROM Drivers WHERE lname LIKE "${req.query.lname}%"`
        }
        // Run the 1st query
        db.pool.query(query3, function(error, rows, fields){    // Execute the query
            let driver = rows;
            res.render('drivers', {data: driver});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query                                  

app.post('/drivers/:add-person-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        query3 = `INSERT INTO Drivers (fname, lname, phone, available) VALUES ('${data.fname}', '${data.lname}', '${data.phone}', '${data.available}')`;
        db.pool.query(query3, function(error, rows, fields){
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Customers
                query4 = `SELECT * FROM Drivers;`;
                db.pool.query(query4, function(error, rows, fields){
    
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



app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
