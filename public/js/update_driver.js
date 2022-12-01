// Citation for code on lines 7 - 56.
// Date 10/25/2022
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

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

    // Put our data we want to send in a javascript object
    let data = {
        driver_id: fullNameValue,
        fname: firstNameValue,
        lname: lastNameValue,
        phone: phoneValue,
        available: availableValue
    }

    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-driver-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Refresh the page once the request is received to display the new data.
    xhttp.onload = function () {
        location.reload();
    };


    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// When the PK is selected for the Update form, the fields in the 
// form get automatically selected or filled out based on the PK selected.
function autofill() {
    // Get the ID of our update form and the value of the PK dropdown selected.
    let selectElement = document.getElementById('update-fullname-driver');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        // If the default option is selected, all the values should be set to the default value.
        document.getElementById('update-fname-driver').value = ''
        document.getElementById('update-lname-driver').value = ''
        document.getElementById('update-phone-driver').value = ''
        document.getElementById('update-availability-driver').value = ''
    } else {

        let table = document.getElementById('drivers-table');

        // Otherwise, we loop through the table, find the row corresponding to the selected PK.
        for (let i = 0, row; row = table.rows[i]; i++) {

            if (table.rows[i].getAttribute('data-value') == selectElement_id) {

                // Then we update the update form's fields with the corresponding values from the table.

                let updateRowIndex = table.getElementsByTagName("tr")[i];

                let firstNameTD = updateRowIndex.getElementsByTagName("td")[1];
                document.getElementById('update-fname-driver').value = firstNameTD.innerHTML;

                let lastNameTD = updateRowIndex.getElementsByTagName("td")[2];
                document.getElementById('update-lname-driver').value = lastNameTD.innerHTML;

                let phoneNumberTD = updateRowIndex.getElementsByTagName("td")[3];


                // We modify the phone number's data to extract the -s.

                // Citation for modification of phone_num
                // Date: 11/30/2022
                // Adapted from:
                // https://stackoverflow.com/questions/9932957/how-can-i-remove-a-character-from-a-string-using-javascript
                let phone_num = phoneNumberTD.innerHTML;
                phone_num = phone_num.split("-").join('');


                document.getElementById('update-phone-driver').value = phone_num;

                let availableTD = updateRowIndex.getElementsByTagName("td")[4];
                document.getElementById('update-availability-driver').value = availableTD.getAttribute('value-availability');
                console.log(availableTD.innerHTML);
            }
        }
    }
}
