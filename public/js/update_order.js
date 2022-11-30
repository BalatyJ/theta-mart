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
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/orders/put-update-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, inputProductIDValue);

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


function updateRow(data, orderproductID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("order-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == orderID) {


            let updateRowIndex = table.getElementsByTagName("tr")[i];


            let td = updateRowIndex.getElementsByTagName("td")[9];


            td.innerHTML = parsedData[0].name;
        }
    }
}

function autofill() {
    let selectElement = document.getElementById('select-update-order_id');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        document.getElementById('update_orderStatus').value = '';
        document.getElementById('input-updatedriver-o').selectedIndex = '';
    } else {


        let table = document.getElementById('orders-table');

        for (let i = 0, row; row = table.rows[i]; i++) {
            console.log(table.rows[i].getAttribute('data-value'));
            if (table.rows[i].getAttribute('data-value') == selectElement_id) {

                let updateRowIndex = table.getElementsByTagName("tr")[i];

                let td1 = updateRowIndex.getElementsByTagName("td")[10];
                document.getElementById('update_orderStatus').value = td1.getAttribute('data-order_status');


                document.getElementById('input-updatedriver-o').selectedIndex = '';
            }
        }
    }
}
