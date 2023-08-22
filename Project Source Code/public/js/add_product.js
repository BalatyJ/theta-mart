// Citation for adding new data:
// Date: 10/22/2022
// Adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addProductForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputDescription = document.getElementById("input-description");
    let inputPrice = document.getElementById("input-price");
    let inputStock = document.getElementById("input-stock");

    // Get the values from the form fields
    let NameValue = inputName.value;
    let descriptionValue = inputDescription.value;
    let priceValue = inputPrice.value;
    let stockValue = inputStock.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: NameValue,
        description: descriptionValue,
        price: priceValue,
        stock: stockValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/products/:add-product-ajax", true);
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
