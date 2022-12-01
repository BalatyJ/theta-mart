// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-orderproduct-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputorderProductID = document.getElementById("select-update-productid");
    let inputProductID = document.getElementById("update_productid");
    let inputOrderProductQuantity = document.getElementById("updatequantity-op");
    let inputOrderProductUnitPrice = document.getElementById("updateunitprice-op");

    // Get the values from the form fields
    let inputorderProductIDValue = inputorderProductID.value;
    let inputProductIDValue = inputProductID.value;
    let inputOrderProductQuantityValue = inputOrderProductQuantity.value;
    let inputOrderProductUnitPriceValue = inputOrderProductUnitPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderproductid: inputorderProductIDValue,
        productid: inputProductIDValue,
        quantity: inputOrderProductQuantityValue,
        unitprice: inputOrderProductUnitPriceValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-update-orderproduct-ajax", true);
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
    let selectElement = document.getElementById('select-update-productid');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        // If the default option is selected, all the values should be set to the default value.
        document.getElementById('update_productid').value = ''
        document.getElementById('updatequantity-op').value = ''
        document.getElementById('updateunitprice-op').value = ''
    } else {

        let table = document.getElementById('orderproducts-table');

        // Otherwise, we loop through the table, find the row corresponding to the selected PK.
        for (let i = 0, row; row = table.rows[i]; i++) {
            console.log(table.rows[i].getAttribute('data-value'));
            if (table.rows[i].getAttribute('data-value') == selectElement_id) {


                // Then we update the update form's fields with the corresponding values from the table.

                let updateRowIndex = table.getElementsByTagName("tr")[i];

                let td1 = updateRowIndex.getElementsByTagName("td")[2];
                document.getElementById('update_productid').value = td1.getAttribute("data-product_id-op");

                let td2 = updateRowIndex.getElementsByTagName("td")[3];
                document.getElementById('updatequantity-op').value = td2.innerHTML;


                // Citation for modification of phone_num
                // Date: 11/30/2022
                // Adapted from:
                // https://stackoverflow.com/questions/9932957/how-can-i-remove-a-character-from-a-string-using-javascript
                let td3 = updateRowIndex.getElementsByTagName("td")[4];
                let unitprice = td3.innerHTML;
                unitprice = unitprice.split("$").join('');

                document.getElementById('updateunitprice-op').value = unitprice;
            }
        }
    }
}
