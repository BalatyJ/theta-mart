// Get the objects we need to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// Modify the objects we need
updateProductForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting.
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProduct = document.getElementById("input-updateproduct-p");
    let inputDescription = document.getElementById("input-updatedescription-p");
    let inputPrice = document.getElementById("input-updateprice-p");
    let inputStock = document.getElementById("input-updatestock-p");


    // Get the values from the form fields
    let inputProductValue = inputProduct.value
    let inputDescriptionValue = inputDescription.value
    let inputPriceValue = inputPrice.value
    let inputStockValue = inputStock.value


    // Put our data we want to send in a javascript object
    let data = {
        product: inputProductValue,
        description: inputDescriptionValue,
        price: inputPriceValue,
        stock: inputStockValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, parseInt(inputProductValue));

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, productID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("product-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") === productID) {

            // Row successfully found.

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let descriptionTD = updateRowIndex.getElementsByTagName("td")[2];
            let priceTD = updateRowIndex.getElementsByTagName("td")[3];
            let stockTD = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            descriptionTD.innerHTML = parsedData[0].description;
            stockTD.innerHTML = parsedData[0].stock;
            priceTD.innerHTML = parsedData[0].price;
        }
    }
}