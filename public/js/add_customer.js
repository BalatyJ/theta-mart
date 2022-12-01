// Citation for adding new data:
// Date: 11/30/2022
// Adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data


// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputPhone = document.getElementById("input-phone");
    let inputStreet = document.getElementById("input-address1");
    let inputUnit = document.getElementById("input-address2");
    let inputCity = document.getElementById("input-city");
    let inputState = document.getElementById("input-state");
    let inputZipCode = document.getElementById("input-zipcode");
    let inputCountry = document.getElementById("input-country");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneValue = inputPhone.value;
    let streetValue = inputStreet.value;
    let unitValue = inputUnit.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipcodeValue = inputZipCode.value;
    let countryValue = inputCountry.value;


    // Put our data we want to send in a javascript object
    let data = {
        fname: firstNameValue,
        lname: lastNameValue,
        phone: phoneValue,
        address1: streetValue,
        address2: unitValue,
        city: cityValue,
        state: stateValue,
        zipcode: zipcodeValue,
        country: countryValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 201) {
            console.log("There was an error with the input.")
        }
    }

    // Once we received the request, we refresh the page.
    xhttp.onload = function () {
        location.reload();
    };


    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});
