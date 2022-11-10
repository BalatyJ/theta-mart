// Get the objects we need to modify
let updateDriverForm = document.getElementById('update-driver-form-ajax');

// Modify the objects we need
updateDriverForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("update-fullname-driver");
    let inputFirstName = document.getElementById("update-fname-driver");
    let inputLastName = document.getElementById("update-lname-driver");
    let inputPhone = document.getElementById("update-phone-driver");
    let inputAvailable = document.getElementById("update-availability-driver");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneValue = inputPhone.value;
    let availableValue = inputAvailable.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld


    // Put our data we want to send in a javascript object
    let data = {
        driver_id: fullNameValue,
        fname: firstNameValue,
        lname: lastNameValue,
        phone: phoneValue,
        available: availableValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-driver-ajax", true);
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



function updateRow(data, driverID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("drivers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == driverID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
