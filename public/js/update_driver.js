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



function updateRow(data, driverID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("drivers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == driverID) {

   
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[4];


            td.innerHTML = parsedData[0].name;
        }
    }
}

function autofill() {
    let selectElement = document.getElementById('update-fullname-driver');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        document.getElementById('update-fname-driver').value = ''
        document.getElementById('update-lname-driver').value = ''
        document.getElementById('update-phone-driver').value = ''
        document.getElementById('update-availability-driver').value = ''
    } else {

        let table = document.getElementById('drivers-table');

        for (let i = 0, row; row = table.rows[i]; i++) {

            if (table.rows[i].getAttribute('data-value') == selectElement_id) {

                let updateRowIndex = table.getElementsByTagName("tr")[i];

                let td1 = updateRowIndex.getElementsByTagName("td")[1];
                document.getElementById('update-fname-driver').value = td1.innerHTML;

                let td2 = updateRowIndex.getElementsByTagName("td")[2];
                document.getElementById('update-lname-driver').value = td2.innerHTML;

                let td3 = updateRowIndex.getElementsByTagName("td")[3];


                // We modify the phone number's data to extract the -s.

                // Citation for modification of phone_num
                // Date: 11/30/2022
                // Adapted from:
                // https://stackoverflow.com/questions/9932957/how-can-i-remove-a-character-from-a-string-using-javascript
                let phone_num = td3.innerHTML;
                phone_num = phone_num.split("-").join('');


                document.getElementById('update-phone-driver').value = phone_num;

                let td4 = updateRowIndex.getElementsByTagName("td")[4];
                document.getElementById('update-availability-driver').value = td4.getAttribute('value-availability');
                console.log(td4.innerHTML);
            }
        }
    }
}
