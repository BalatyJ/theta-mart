// Get the objects we need to modify
let addPersonForm = document.getElementById('add-person-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-orderdate-o");
    let inputStreet = document.getElementById("input-street-o");
    let inputUnit = document.getElementById("input-unit-o");
    let inputCity = document.getElementById("input-city-o");
    let inputState = document.getElementById("input-state-o");
    let inputZipcode = document.getElementById("input-zipcode-o");
    let inputCountry = document.getElementById("input-country-o");
    let inputOrderStatusID = document.getElementById("input-orderstatusid-o");
    let inputDriverID = document.getElementById("input-driverid-o");
    let inputCustID = document.getElementById("input-customerid-o");


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
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputStreet.value = '';
            inputUnit.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZipcode.value = '';
            inputCountry.value = '';
            inputOrderStatusID.value = '';
            inputDriverID.value = '';
            inputCustID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("orders-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let streetCell = document.createElement("TD");
    let unitCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipcodeCell = document.createElement("TD");
    let countryCell = document.createElement("TD");
    let orderStatusIdCell = document.createElement("TD");
    let DriverCell = document.createElement("TD");
    let CustomerCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");



    // Fill the cells with correct data
    idCell.innerText = newRow.order_id;
    orderDateCell.innerText = newRow.order_date;
    streetCell.innerText = newRow.address1;
    unitCell.innerText = newRow.address2;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    zipcodeCell.innerText = newRow.zipcode;
    countryCell.innerText = newRow.country;
    orderStatusIdCell.innerText = newRow.orderstatus_id;
    DriverCell.innerText = newRow.driver_id;
    CustomerCell.innerText = newRow.customer_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteOrderProduct(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(orderDateCell);
    row.appendChild(streetCell);
    row.appendChild(unitCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipcodeCell);
    row.appendChild(countryCell);
    row.appendChild(orderStatusIdCell);
    row.appendChild(DriverCell);
    row.appendChild(CustomerCell);

    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
}