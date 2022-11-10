// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("update-fullname");
    let inputFirstName = document.getElementById("update-fname");
    let inputLastName = document.getElementById("update-lname");
    let inputPhone = document.getElementById("update-phone");
    let inputStreet = document.getElementById("update-address1");
    let inputUnit = document.getElementById("update-address2");
    let inputCity = document.getElementById("update-city");
    let inputState = document.getElementById("update-state");
    let inputZipCode = document.getElementById("update-zipcode");
    let inputCountry = document.getElementById("update-country");


    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneValue = inputPhone.value;
    let streetValue = inputStreet.value;
    let unitValue = inputUnit.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipcodeValue = inputZipCode.value;
    let countryValue = inputCountry.value;
    
    if (isNaN(phoneValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        customer_id: fullNameValue,
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
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    

        xhttp.onload = function () {
            location.reload();
          };
        

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of phone value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign phone to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
