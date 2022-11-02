// Get the objects we need to modify
let addProductForm = document.getElementById('add-orderproduct-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderid = document.getElementById("input-orderid-op");
    let inputProductname = document.getElementById("input-productid-op");
    let inputQuantity = document.getElementById("input-quantity-op");
    let inputUnitprice = document.getElementById("input-unitprice-op");

    // // Get the values from the form fields
    let orderIdValue = inputOrderid.value;
    let productNameValue = inputProductname.value;
    let quantityValue = inputQuantity.value;
    let unitPriceValue = inputUnitprice.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderid: orderIdValue,
        productid: productNameValue,
        quantity: quantityValue,
        unitprice: unitPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-orderproduct-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            document.getElementById("input-orderid").value = '';
            document.getElementById("input-productid").value = '';
            document.getElementById("input-quantity").value = '';
            document.getElementById("input-unitprice").value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    console.log("About to send the request.")
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("orderproducts-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderIdCell = document.createElement("TD");
    let productCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let unitPriceCell = document.createElement("TD");
    let unitSubtotalCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.orderproduct_id;
    orderIdCell.innerText = newRow.order_id;
    productCell.innerText = newRow.name;
    quantityCell.innerText = newRow.quantity;
    unitPriceCell.innerText = newRow.unit_price;
    unitSubtotalCell.innerText = (newRow.quantity * newRow.unit_price);

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteOrderProduct(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(orderIdCell);
    row.appendChild(productCell);
    row.appendChild(quantityCell);
    row.appendChild(unitPriceCell);
    row.appendChild(unitSubtotalCell);
    row.appendChild(deleteCell);


    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
}