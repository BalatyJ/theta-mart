// Citation for adding new data:
// Date: 11/30/2022
// Adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addProductForm = document.getElementById('add-orderproduct-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderid = document.getElementById("input-orderid-op");
    let inputProductname = document.getElementById("input-productid-op");
    let inputQuantity = document.getElementById("input-quantity-op");
    let inputUnitprice = document.getElementById("input-unitprice-op");

    // // Get the values from the form fields
    let orderIdValue = inputOrderid.value;
    let productNameValue = inputProductname.value;
    let quantityValue = inputQuantity.value;
    let unitPriceValue = inputUnitprice.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderid: orderIdValue,
        productid: productNameValue,
        quantity: quantityValue,
        unitprice: unitPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-orderproduct-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 201) {
            console.log("There was an error with the input.")
        }
    }

    // Once we receive a response, we refresh the page.
    xhttp.onload = function () {
        location.reload();
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
