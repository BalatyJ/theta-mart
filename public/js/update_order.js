// Citation for code on lines 7 - 56.
// Date 10/25/2022
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updateOrderForm = document.getElementById('update-order-form-ajax');

// Modify the objects we need
updateOrderForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputorderID = document.getElementById("select-update-order_id");
    let inputorderStatusID = document.getElementById("update_orderStatus");
    let inputdriverID = document.getElementById("input-updatedriver-o");

    // Get the values from the form fields
    let inputorderIDValue = inputorderID.value;
    let inputorderStatusValue = inputorderStatusID.value;
    let inputdriverIDValue = inputdriverID.value;


    let data = {
        order_id: inputorderIDValue,
        orderstatus_id: inputorderStatusValue,
        driver_id: inputdriverIDValue
    }



    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/orders/put-update-order-ajax", true);
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


// Autopopulate's the update form's fields when a PK is selected in the update form's drop down.
function autofill() {
    // Obtain the value in our selected element.
    let selectElement = document.getElementById('select-update-order_id');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        // If the default option is selected, we set all input fields and dropdowns to the default option.
        document.getElementById('update_orderStatus').value = '';
        document.getElementById('input-updatedriver-o').selectedIndex = '';
    } else {

        // Otherwise we get the row's data from display table corresponding to the Order ID selected.
        let table = document.getElementById('orders-table');
        for (let i = 0, row; row = table.rows[i]; i++) {
            if (table.rows[i].getAttribute('data-value') == selectElement_id) {

                // Once the correct row is found, we extract the row's data and use that with our order status, and set the driver
                // to the default value.
                let updateRowIndex = table.getElementsByTagName("tr")[i];
                let orderStatusTD = updateRowIndex.getElementsByTagName("td")[10];
                document.getElementById('update_orderStatus').value = orderStatusTD.getAttribute('data-order_status');
                document.getElementById('input-updatedriver-o').selectedIndex = '';
            }
        }
    }
}
