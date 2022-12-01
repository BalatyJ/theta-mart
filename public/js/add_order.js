// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-addorderdate-o");
    let inputStreet = document.getElementById("input-addstreet-o");
    let inputUnit = document.getElementById("input-addunit-o");
    let inputCity = document.getElementById("input-addcity-o");
    let inputState = document.getElementById("input-addstate-o");
    let inputZipcode = document.getElementById("input-addzipcode-o");
    let inputCountry = document.getElementById("input-addcountry-o");
    let inputOrderStatusID = document.getElementById("input-addorderstatus-o");
    let inputDriverID = document.getElementById("input-adddriver-o");
    let inputCustID = document.getElementById("input-addcustomer-o");



    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value
    let StreetValue = inputStreet.value
    let UnitValue = inputUnit.value
    let CityValue = inputCity.value
    let StateValue = inputState.value
    let ZipcodeValue = inputZipcode.value
    let CountryValue = inputCountry.value
    let OrderStatusIDValue = inputOrderStatusID.value
    let DriverIDValue = inputDriverID.value
    let CustIDValue = inputCustID.value

    // Put our data we want to send in a javascript object
    let data = {
        orderdate: orderDateValue,
        street: StreetValue,
        unit: UnitValue,
        city: CityValue,
        state: StateValue,
        zipcode: ZipcodeValue,
        country: CountryValue,
        orderstatusid: OrderStatusIDValue,
        driverid: DriverIDValue,
        customerid: CustIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 201) {
            console.log("There was an error with the input.")
        }
    }

    // Once we receive a response, we refresh the page.
    xhttp.onload = function () {
        location.reload();
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
