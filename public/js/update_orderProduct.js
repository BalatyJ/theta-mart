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

    let table = document.getElementById("orderproducts-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == orderproductID) {


            let updateRowIndex = table.getElementsByTagName("tr")[i];


            let td = updateRowIndex.getElementsByTagName("td")[3];


            td.innerHTML = parsedData[0].name;
        }
    }
}

function autofill() {
    let selectElement = document.getElementById('select-update-productid');
    let selectElement_id = selectElement.value;

    if (selectElement_id === '') {
        document.getElementById('update_productid').value = ''
        document.getElementById('updatequantity-op').value = ''
        document.getElementById('updateunitprice-op').value = ''
    } else {

        let table = document.getElementById('orderproducts-table');

        for (let i = 0, row; row = table.rows[i]; i++) {
            console.log(table.rows[i].getAttribute('data-value'));
            if (table.rows[i].getAttribute('data-value') == selectElement_id) {

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
