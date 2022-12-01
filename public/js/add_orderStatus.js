// Get the objects we need to modify
let addorderStatusForm = document.getElementById('add-orderStatus-form-ajax');

// Modify the objects we need
addorderStatusForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputorderStatus = document.getElementById("input-orderStatus");
    let inputDescription = document.getElementById("input-description-o");

    // Get the values from the form fields
    let orderStatusValue = inputorderStatus.value;
    let descriptionValue = inputDescription.value;


    // Put our data we want to send in a javascript object
    let data = {
        orderstatus_id: orderStatusValue,
        description: descriptionValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/orderStatuses/:add-orderStatus-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 201) {
            console.log("There was an error with the input.")
            alert(`The OrderStatus "${data.orderstatus_id}" is already being used. Please pick a unique name for each new OrderStatus.`)
        }
    }

    // Once we receive a response, we refresh the page.
    xhttp.onload = function () {
        location.reload();
    };


    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
