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
        if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }


    // Once we've received the request, we refresh the page to show the updated display table.
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
    let selectElement = document.getElementById('update-fullname');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        // If the default option is selected, all the values should be set to the default value.
        document.getElementById('update-country').value = ''
        document.getElementById('update-zipcode').value = ''
        document.getElementById('update-state').value = ''
        document.getElementById('update-city').value = ''
        document.getElementById('update-address2').value = ''
        document.getElementById('update-address1').value = ''
        document.getElementById('update-phone').value = ''
        document.getElementById('update-lname').value = ''
        document.getElementById('update-fname').value = ''

    } else {
        let table = document.getElementById('customers-table');

        // Otherwise, we loop through the table, find the row corresponding to the selected PK.
        for (let i = 0, row; row = table.rows[i]; i++) {
            console.log(table.rows[i].getAttribute('data-value'));
            if (table.rows[i].getAttribute('data-value') == selectElement_id) {

                // Then we update the update form's fields with the corresponding values from the table.

                let updateRowIndex = table.getElementsByTagName("tr")[i];

                let td1 = updateRowIndex.getElementsByTagName("td")[1];
                document.getElementById('update-fname').value = td1.innerHTML;

                let td2 = updateRowIndex.getElementsByTagName("td")[2];
                document.getElementById('update-lname').value = td2.innerHTML;

                let td3 = updateRowIndex.getElementsByTagName("td")[3];

                // We modify the phone number's data to extract the -s.

                // Citation for modification of phone_num
                // Date: 11/30/2022
                // Adapted from:
                // https://stackoverflow.com/questions/9932957/how-can-i-remove-a-character-from-a-string-using-javascript
                let phone_num = td3.innerHTML;
                phone_num = phone_num.split("-").join('');

                document.getElementById('update-phone').value = phone_num;

                let td4 = updateRowIndex.getElementsByTagName("td")[4];
                document.getElementById('update-address1').value = td4.innerHTML;

                let td5 = updateRowIndex.getElementsByTagName("td")[5];
                document.getElementById('update-address2').value = td5.innerHTML;

                let td6 = updateRowIndex.getElementsByTagName("td")[6];
                document.getElementById('update-city').value = td6.innerHTML;

                let td7 = updateRowIndex.getElementsByTagName("td")[7];
                document.getElementById('update-state').value = td7.innerHTML;

                let td8 = updateRowIndex.getElementsByTagName("td")[8];
                document.getElementById('update-zipcode').value = td8.innerHTML;

                let td9 = updateRowIndex.getElementsByTagName("td")[9];
                document.getElementById('update-country').value = td9.innerHTML;

            }
        }
    }
}
