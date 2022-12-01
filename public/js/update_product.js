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
    xhttp.open("PUT", "/products/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Refreshes the page to show the newly updated data.
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
    let selectElement = document.getElementById('input-updateproduct-p');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        // If the default option is selected, all the values should be set to the default value.
        document.getElementById('input-updatedescription-p').value = ''
        document.getElementById('input-updateprice-p').value = ''
        document.getElementById('input-updatestock-p').value = ''
    } else {

        let table = document.getElementById('product-table');

        // Otherwise, we loop through the table, find the row corresponding to the selected PK.
        for (let i = 0, row; row = table.rows[i]; i++) {
            console.log(table.rows[i].getAttribute('data-value'));
            if (table.rows[i].getAttribute('data-value') == selectElement_id) {

                // Then we update the update form's fields with the corresponding values from the table.
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                let td1 = updateRowIndex.getElementsByTagName("td")[2];
                document.getElementById('input-updatedescription-p').value = td1.innerHTML;



                // Citation for modification of phone_num
                // Date: 11/30/2022
                // Adapted from:
                // https://stackoverflow.com/questions/9932957/how-can-i-remove-a-character-from-a-string-using-javascript
                let td2 = updateRowIndex.getElementsByTagName("td")[3];
                let unitprice = td2.innerHTML;
                unitprice = unitprice.split("$").join('');
                document.getElementById('input-updateprice-p').value = unitprice;

                let td3 = updateRowIndex.getElementsByTagName("td")[4];
                document.getElementById('input-updatestock-p').value = td3.innerHTML;
            }
        }
    }
}
