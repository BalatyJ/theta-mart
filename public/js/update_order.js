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
